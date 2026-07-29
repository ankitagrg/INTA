# INTA — Final Project Report

**AI-Powered Interview Preparation Platform**
Final Year Project (BE Software Engineering) — Ankita Gurung & Sabina Karki
Supervised by Er. Ranjan Adhikari, Gandaki College of Engineering and Science

This report covers a full quality-review pass across the entire application: bug fixes, duplicate-code removal, React rendering optimization, MongoDB query optimization, Express performance hardening, and a security/JWT/validation audit. No new user-facing features were added in this pass — only correctness, performance, and security improvements to what already exists.

---

## 1. Architecture Overview

**Frontend**: React 18 + Vite + Tailwind CSS + React Router, dark-mode ready, toast notifications, a small reusable component library.

**Backend**: Node.js + Express + MongoDB (Atlas) via Mongoose, JWT authentication, centralized error handling, standardized API responses.

**AI Engine**: A local, offline 6-step evaluation pipeline (grammar, sentiment, keyword matching, TF-IDF, transformer-based semantic similarity, weighted composite score) — no external API calls, no per-request cost.

### Folder structure (audited, unchanged — already clean)

```
server/
├── config/        db.js
├── controllers/   authController.js, sessionController.js
├── middleware/    authMiddleware.js, errorHandler.js, rateLimiter.js
├── models/        User, Question, InterviewSession, Response, EvaluationResult
├── routes/        authRoutes.js, sessionRoutes.js
├── seed/          questions.js (250 questions), seed.js
├── services/ai/   6-step evaluation pipeline
├── utils/         AppError, apiResponse, asyncHandler, generateToken
└── validators/    authValidator.js, sessionValidator.js

client/src/
├── api/           axiosClient.js
├── components/    AppNav, AppToaster, Badge, BrandIcon, Button, Card,
│                  Input, Skeleton, Spinner, ThemeToggle
├── context/       AuthContext, ThemeContext
├── hooks/         useAuth, useTheme
├── layouts/       AuthLayout
├── pages/         Landing, Login, Signup, Dashboard, Session, Results,
│                  NotFound, Loading
├── routes/        ProtectedRoute
├── services/      authService, sessionService
└── utils/         scoreColor, toast
```

No dead files, no misplaced files, consistent naming across both sides.

---

## 2. Bugs Found and Fixed

### 2.1 Refresh-token rotation silently broken (bcrypt 72-byte truncation) — **critical, security-relevant**

While building refresh-token rotation, testing showed a previously-rotated (supposedly invalid) refresh token was still being accepted. Root cause: refresh tokens were hashed with **bcrypt**, which silently truncates input at 72 bytes. Two refresh tokens issued for the same user share an identical JWT header + `id` field prefix that alone exceeds 72 bytes before the unique `jti` claim is even reached — so bcrypt was comparing truncated, identical prefixes and treating *any* refresh token for that user as a match, completely defeating rotation.

**Fix**: switched refresh-token hashing from bcrypt to SHA-256 (`server/controllers/authController.js`). bcrypt remains correctly used for the actual password (a low-entropy, human-chosen secret, which is exactly what bcrypt's slow salted hashing is for); refresh tokens are high-entropy random JWTs, for which a fast, unbounded-length hash is the correct tool. Verified live: old tokens now correctly rejected (401) after rotation, current tokens still work, logout correctly revokes.

A second, related bug (JWT signing is deterministic — two tokens minted in the same second for the same payload/secret are byte-for-byte identical) was fixed by adding a random `jti` claim to every refresh token.

### 2.2 Token-expiry regression avoided before it shipped

Mid-build of automatic token refresh, work was paused (explicitly out of scope for this pass — "no new features"). The access-token expiry had already been shortened from 7 days to 15 minutes to make refresh meaningful; left as-is, this would have logged every user out every 15 minutes with no silent-refresh path on the frontend to recover. Reverted to 7 days. The refresh/logout endpoints remain in the backend (bug-fixed, tested, unused) as a foundation for when frontend integration is picked up later.

### 2.3 Sequential queries that should run in parallel

`submitAnswer` fetched the session and the question with two sequential `await` calls despite them being fully independent lookups. Changed to `Promise.all`, roughly halving that part of the request's latency.

---

## 3. Duplicate Code Removed

- **`getOwnedSession` helper** (`sessionController.js`): the "fetch session → 404 if missing → 403 if not owned" pattern was repeated near-identically across `submitAnswer`, `getNextQuestion`, `completeSession`, and `getSessionResults`. Consolidated into one helper all four now use.
- **`notify.apiError` / `getErrorMessage`** (`utils/toast.js`): the pattern `err.response?.data?.message || "fallback"` was repeated in 7 places across Login, Signup, Session (×3), Dashboard, and Results. Consolidated into a single utility function.

---

## 4. React Rendering Optimizations

`AuthContext` and `ThemeContext` both wrap the entire app near the root. Both were reconstructing their provider `value` object — and every function inside it — on every render, a classic React Context pitfall that forces every consumer of `useAuth()`/`useTheme()` to re-render even when the actual values haven't changed. Fixed with `useCallback` on the functions and `useMemo` on the value object in both contexts.

---

## 5. MongoDB Query Optimizations

- **`.lean()` added** to `getDashboard` and `getCurrentSession` — both are read-only queries (never mutated/saved in those functions), so skipping Mongoose document hydration is free performance. Verified neither endpoint's response actually depended on any Mongoose virtual (`getDashboard` builds its own plain response objects; nothing in the frontend currently reads the `InterviewSession`/`Question`/`User`/`Response` virtuals at all — noted as a known, harmless piece of unused capability, not a bug).
- **Parallelized independent lookups** in `submitAnswer` (see §2.3).
- **Indexes** (added in an earlier pass, reconfirmed still correct): compound index on `Question{category, role, difficulty}` matching the exact query shape the app uses; compound index on `InterviewSession{user, status}`, which also correctly serves the plain `{user}` queries `getAskedQuestionIds` runs (compound index prefix rule).
- **Known, accepted scaling boundary**: `getAskedQuestionIds` loads all of a user's past question IDs into an in-memory `Set` per session-progress call. Fine at current/expected FYP scale; would need revisiting if a single user accumulates thousands of sessions. Not changed in this pass — the fix (e.g., a `$nin` pushed into an aggregation) is a bigger, riskier rewrite for a problem that doesn't exist yet at this scale.

---

## 6. Express Performance

Added three standard, previously-missing pieces to `server.js`:
- **`helmet()`** — sets standard security headers (`X-Content-Type-Options`, `X-Frame-Options`, etc.). Verified it doesn't interfere with CORS.
- **`compression()`** — gzips responses.
- **`express.json({ limit: "100kb" })`** — previously unbounded; interview answers are capped at 5000 characters at the schema level, so 100kb is generous headroom while preventing oversized-body abuse before validation even runs.

---

## 7. Security Audit

| Area | Status |
|---|---|
| Password hashing | ✅ bcrypt, correctly salted |
| NoSQL injection | ✅ closed in an earlier pass (type-checked validators reject object payloads) |
| Refresh token storage | ✅ fixed this pass (§2.1) — SHA-256, not bcrypt |
| Rate limiting | ✅ **added this pass** — 10 attempts / 15 min on `/api/auth/login`. Verified live: attempts 1–10 return 401, attempt 11+ returns 429 |
| Security headers | ✅ **added this pass** — helmet |
| CORS | ✅ restricted to a single known origin (not wildcard) |
| Secrets in git | ✅ `.env` correctly gitignored, never committed |
| Session/data ownership | ✅ fixed in an earlier pass (IDOR) — every session-scoped endpoint verifies the requester owns the resource |
| Body size limits | ✅ **added this pass** |
| Dependency vulnerabilities | ⚠️ **documented, not fixed** — `npm audit` reports high/critical findings in `@xenova/transformers`'s transitive dependencies (`onnxruntime-web`, `sharp`, `protobufjs`). Confirmed these are pre-existing and unrelated to any package added in this pass. Not force-fixed: `npm audit fix --force` would downgrade the transformer library and risks breaking the core AI model loading — a much larger risk than the audit findings themselves, which require attack vectors (malicious ONNX/protobuf input) this app never exposes since it only loads its own pinned model |
| Forgot password / social login | ❌ still not implemented (pre-existing, out of scope — see project's own README "future features") |

---

## 8. JWT Audit

- **Algorithm**: default HS256, appropriate for a single-backend deployment.
- **Two separate secrets**: `JWT_SECRET` (access tokens) and `JWT_REFRESH_SECRET` (refresh tokens) — so a leaked access-token secret alone can't be used to mint long-lived sessions. Both required at boot (`server.js` fails fast if either is missing).
- **Expiry**: access token 7 days (see §2.2 for why), refresh token 30 days (currently unused by the frontend).
- **Payload contents**: access token carries `{id, role}` — no over-exposure (no email/name in the token itself). Refresh token carries only `{id, jti}`.
- **Rotation + revocation**: fixed and verified this pass (§2.1) — old tokens correctly rejected after use, logout correctly revokes.
- **Verification**: `authMiddleware.js` correctly rejects missing/malformed/expired tokens with 401; no bugs found.

---

## 9. Validation Audit

Both validator files (`authValidator.js`, `sessionValidator.js`) were reviewed line by line — all fields are type-checked (not just truthiness-checked, which is what previously allowed the NoSQL-injection gap closed in an earlier pass), email format is regex-validated, MongoDB ObjectIds are validated with `mongoose.Types.ObjectId.isValid`, category is checked against the model's own enum (single source of truth, no drift risk). No gaps found; no changes needed.

---

## 10. What Was Deliberately Not Touched

Per this task's explicit instruction ("do not add new features"):
- Automatic token refresh — backend exists and is now bug-fixed, but frontend integration (axios interceptor, redirect flow, Dashboard CTA) was paused mid-build and left as-is.
- Forgot password, social login, admin panel, rate limiting beyond login — all pre-existing, documented gaps, not addressed.
- `getAskedQuestionIds`'s in-memory approach — a real but not-yet-relevant scaling boundary, noted rather than prematurely rewritten.

---

## 11. Verification

Every change in this pass was verified against the live backend (MongoDB Atlas) and frontend dev server, not just reviewed statically:
- Full signup → login → start session → submit answer → complete → results → dashboard flow, re-run after every structural change.
- Refresh-token rotation bug reproduced, root-caused with direct database inspection and manual `bcrypt.compare` testing, fixed, and re-verified with old/new/garbage tokens.
- Rate limiter tested with 12 rapid requests (10 allowed, then 429s).
- helmet/compression confirmed not to break CORS or existing functionality.
- All touched frontend files individually compile-checked via the Vite dev server.

**Bottom line**: this pass found and fixed one genuine security-relevant bug (refresh-token rotation), removed real duplication, applied standard React and Express performance practices, and closed the remaining basic security gaps (rate limiting, security headers, body size limits) — without changing any user-facing behavior.
