import { useEffect, useRef, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Renders Google's own "Sign in with Google" button (via Google Identity
 * Services, loaded in index.html) and hands the resulting ID token
 * ("credential") to onSuccess. Google's branding guidelines require using
 * their rendered button as-is rather than a custom-skinned lookalike.
 */
export default function GoogleSignInButton({ onSuccess, onError, type = "icon" }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return undefined;

    let cancelled = false;
    let attempts = 0;

    const tryInit = () => {
      if (cancelled) return;

      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (response.credential) onSuccess(response.credential);
            else onError?.(new Error("No credential returned from Google"));
          },
        });

        if (containerRef.current) {
          window.google.accounts.id.renderButton(containerRef.current, {
            type,
            theme: "outline",
            size: "large",
            shape: type === "icon" ? "circle" : "pill",
            width: containerRef.current.offsetWidth || 320,
          });
        }
        setReady(true);
      } else if (attempts < 40) {
        // The GIS script is loaded with async/defer, so it may not be
        // ready on first mount — poll briefly rather than failing.
        attempts += 1;
        setTimeout(tryInit, 100);
      }
    };

    tryInit();
    return () => {
      cancelled = true;
    };
  }, [onSuccess, onError, type]);

  // Not configured yet (no VITE_GOOGLE_CLIENT_ID) — omit rather than show
  // a button that can't actually do anything.
  if (!GOOGLE_CLIENT_ID) return null;

  return <div ref={containerRef} className={ready ? "" : "opacity-0"} aria-live="polite" />;
}
