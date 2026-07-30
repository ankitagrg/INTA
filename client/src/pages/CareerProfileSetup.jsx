import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as careerProfileService from "../services/careerProfileService";
import { notify } from "../utils/toast.js";
import { labelFor } from "../utils/labels.js";
import AppNav from "../components/AppNav.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Spinner from "../components/Spinner.jsx";

const EXPERIENCE_HINTS = {
  internship: "Just starting out, preparing for an internship",
  fresher: "Recently graduated, no professional experience yet",
  junior: "1–2 years of professional experience",
  mid: "A few solid years under your belt",
  senior: "Deep, proven expertise in your field",
};

const DIFFICULTY_HINTS = {
  easy: "Warm up with simpler questions",
  medium: "Balanced, standard-interview difficulty",
  hard: "Push yourself with tougher questions",
  adaptive: "Starts medium, adjusts to your running score",
};

const STEPS = ["Position", "Experience", "Tech Stack", "Preferences"];

function StepIndicator({ current }) {
  return (
    <ol className="flex items-center justify-between" aria-label="Setup progress">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex-1 flex items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                  done
                    ? "bg-blue-600 text-white"
                    : active
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-2 border-blue-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${
                  active ? "text-slate-800 dark:text-slate-100" : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 sm:mx-3 -mt-5 sm:-mt-6 transition ${
                  done ? "bg-blue-600" : "bg-slate-100 dark:bg-slate-800"
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function PillOption({ selected, onClick, title, subtitle }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`text-left rounded-2xl px-5 py-4 border-2 transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        selected
          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-500/10"
          : "border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{title}</p>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
    </button>
  );
}

function TechChip({ selected, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        selected
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
      }`}
    >
      {children}
    </button>
  );
}

export default function CareerProfileSetup() {
  const navigate = useNavigate();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    position: "",
    experienceLevel: "",
    techStack: [],
    companyType: "any",
    difficulty: "adaptive",
    language: "english",
  });

  useEffect(() => {
    (async () => {
      try {
        const [optionsData, profileData] = await Promise.all([
          careerProfileService.getProfileOptions(),
          careerProfileService.getMyProfile(),
        ]);
        setOptions(optionsData);
        if (profileData.profile) {
          const { position, experienceLevel, techStack, companyType, difficulty, language } = profileData.profile;
          setForm({ position, experienceLevel, techStack, companyType, difficulty, language });
        }
      } catch (err) {
        notify.apiError(err, "Could not load profile setup");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleTech = (value) => {
    setForm((f) => ({
      ...f,
      techStack: f.techStack.includes(value) ? f.techStack.filter((t) => t !== value) : [...f.techStack, value],
    }));
  };

  const canAdvance = [Boolean(form.position), Boolean(form.experienceLevel), form.techStack.length > 0, true][step];

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await careerProfileService.saveMyProfile(form);
      notify.success("Career profile saved");
      navigate("/session");
    } catch (err) {
      notify.apiError(err, "Could not save your profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center gap-4">
        <Spinner size="lg" className="text-blue-600 dark:text-blue-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">Loading profile setup...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-[#f8f9ff] dark:from-slate-950 dark:to-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <AppNav onLogoClick={() => navigate("/session")} />

      <main className="flex-1 max-w-2xl w-full mx-auto p-6 md:py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-[#0e1628] dark:text-white tracking-tight">
            Set up your career profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Tell us what you're aiming for so INTA can tailor your mock interviews to it.
          </p>
        </div>

        <StepIndicator current={step} />

        <Card className="rounded-[28px] p-8 space-y-6 animate-fade-in">
          {/* Step 1: Position */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">Which position are you targeting?</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This shapes the kind of technical questions you'll see.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1" role="radiogroup">
                {options.positions.map((p) => (
                  <PillOption
                    key={p}
                    selected={form.position === p}
                    onClick={() => setForm((f) => ({ ...f, position: p }))}
                    title={labelFor(p)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">What's your experience level?</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Used to set a fair starting difficulty for your questions.
                </p>
              </div>
              <div className="grid gap-3" role="radiogroup">
                {options.experienceLevels.map((level) => (
                  <PillOption
                    key={level}
                    selected={form.experienceLevel === level}
                    onClick={() => setForm((f) => ({ ...f, experienceLevel: level }))}
                    title={labelFor(level)}
                    subtitle={EXPERIENCE_HINTS[level]}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Tech Stack */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">Select your tech stack</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Pick everything relevant — technical questions are pulled from your strongest matching track.
                </p>
              </div>
              {options.techStackGroups.map((g) => (
                <div key={g.group} className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {g.group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {g.options.map((t) => (
                      <TechChip key={t} selected={form.techStack.includes(t)} onClick={() => toggleTech(t)}>
                        {labelFor(t)}
                      </TechChip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">A few preferences</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Fine-tune the interview experience. Defaults work well if you're not sure.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Preferred company type
                </p>
                <div className="flex flex-wrap gap-2">
                  {options.companyTypes.map((c) => (
                    <TechChip key={c} selected={form.companyType === c} onClick={() => setForm((f) => ({ ...f, companyType: c }))}>
                      {labelFor(c)}
                    </TechChip>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Interview difficulty
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {options.difficulties.map((d) => (
                    <PillOption
                      key={d}
                      selected={form.difficulty === d}
                      onClick={() => setForm((f) => ({ ...f, difficulty: d }))}
                      title={labelFor(d)}
                      subtitle={DIFFICULTY_HINTS[d]}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Interview language
                </p>
                <div className="flex flex-wrap gap-2">
                  {options.languages.map((l) => (
                    <TechChip key={l} selected={form.language === l} onClick={() => setForm((f) => ({ ...f, language: l }))}>
                      {labelFor(l)}
                    </TechChip>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="ghost" onClick={goBack} disabled={step === 0}>
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button onClick={goNext} disabled={!canAdvance}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={saving}>
                {saving ? "Saving..." : "Save & Start Interview"}
              </Button>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}