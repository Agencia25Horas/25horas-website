"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/language-context";
import { trackEvent } from "@/components/chrome/Analytics";

type Step = 1 | 2 | 3 | 4 | 5;

type State = {
  step: Step;
  projectType?: string;
  deliverable?: string;
  timeline?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
};

export function BudgetForm() {
  const { t, tNiche } = useLang();
  const [s, set] = useState<State>({
    step: 1,
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectTypes = useMemo(
    () =>
      [
        "restaurantes",
        "desporto",
        "real-estate",
        "travel",
        "corporate",
        "saude",
      ].map((slug) => tNiche(slug).label),
    [tNiche],
  );

  const deliverables = [
    t("orcamento.form.deliverable.video"),
    t("orcamento.form.deliverable.reels"),
    t("orcamento.form.deliverable.foto"),
    t("orcamento.form.deliverable.design"),
    t("orcamento.form.deliverable.redes"),
    t("orcamento.form.deliverable.outro"),
  ];

  const timelines = [
    t("orcamento.form.timeline.short"),
    t("orcamento.form.timeline.mid"),
    t("orcamento.form.timeline.long"),
  ];

  const next = () => set((p) => ({ ...p, step: (p.step + 1) as Step }));
  const back = () => set((p) => ({ ...p, step: (p.step - 1) as Step }));

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: s.projectType,
          deliverable: s.deliverable,
          timeline: s.timeline,
          name: s.name,
          email: s.email,
          phone: s.phone,
          company: s.company,
          website: s.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          data.error ??
            "Não conseguimos enviar agora. Tenta de novo ou usa o email directo.",
        );
        trackEvent("Quote failed", {
          reason: data.error ?? `http_${res.status}`,
        });
        return;
      }
      trackEvent("Quote submitted", {
        niche: s.projectType ?? "",
        deliverable: s.deliverable ?? "",
        timeline: s.timeline ?? "",
      });
      set((p) => ({ ...p, step: 5 }));
    } catch {
      setError("Falha de rede. Verifica a ligação ou usa o email directo.");
    } finally {
      setSubmitting(false);
    }
  };

  const canContinue = (() => {
    if (s.step === 1) return !!s.projectType;
    if (s.step === 2) return !!s.deliverable;
    if (s.step === 3) return !!s.timeline;
    if (s.step === 4) return s.name.length > 1 && /.+@.+\..+/.test(s.email);
    return false;
  })();

  if (s.step === 5) {
    return (
      <div className="max-w-xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-grade">
          {t("orcamento.confirm.eyebrow")}
        </p>
        <h2 className="mt-4 font-display uppercase text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-canvas-white">
          {t("orcamento.confirm.title")}
        </h2>
        <p className="mt-6 font-body text-[16px] leading-relaxed text-canvas-white/85">
          {t("orcamento.confirm.body")}
        </p>
        <p className="mt-6 font-body text-[14px] leading-relaxed text-canvas-white/60">
          {t("orcamento.confirm.urgente")}
          <br />
          <a
            href="mailto:atendimento@25horasagency.com"
            className="underline underline-offset-4 text-canvas-white hover:opacity-70"
          >
            atendimento@25horasagency.com
          </a>
          <br />
          <a
            href="tel:+351963869519"
            className="underline underline-offset-4 text-canvas-white hover:opacity-70"
          >
            +351 963 869 519
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
        <span>{t("orcamento.form.title")}</span>
        <span>
          {t("orcamento.form.passo")} {s.step} {t("orcamento.form.de")} 4
        </span>
      </div>

      {s.step === 1 && (
        <ChipStep
          question={t("orcamento.form.q1")}
          options={projectTypes}
          value={s.projectType}
          onChange={(v) => set((p) => ({ ...p, projectType: v }))}
          columns="grid-cols-2 md:grid-cols-3"
        />
      )}
      {s.step === 2 && (
        <ChipStep
          question={t("orcamento.form.q2")}
          options={deliverables}
          value={s.deliverable}
          onChange={(v) => set((p) => ({ ...p, deliverable: v }))}
          columns="grid-cols-1 md:grid-cols-2"
        />
      )}
      {s.step === 3 && (
        <ChipStep
          question={t("orcamento.form.q3")}
          options={timelines}
          value={s.timeline}
          onChange={(v) => set((p) => ({ ...p, timeline: v }))}
          columns="grid-cols-1 md:grid-cols-3"
        />
      )}
      {s.step === 4 && <ContactStep state={s} setState={set} />}

      {error && (
        <p role="alert" className="mt-6 font-body text-[14px] text-accent-grade">
          {error}
        </p>
      )}

      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={back}
          disabled={s.step === 1 || submitting}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 hover:text-canvas-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t("common.voltar")}
        </button>
        {s.step < 4 ? (
          <button
            onClick={next}
            disabled={!canContinue}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-canvas-white text-canvas-black font-mono text-[12px] uppercase tracking-[0.15em] hover:opacity-85 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t("common.continuar")}
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!canContinue || submitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-canvas-white text-canvas-black font-mono text-[12px] uppercase tracking-[0.15em] hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "…" : t("common.enviarPedido")}
          </button>
        )}
      </div>
    </div>
  );
}

function ChipStep({
  question,
  options,
  value,
  onChange,
  columns,
}: {
  question: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  columns: string;
}) {
  return (
    <>
      <h2 className="font-display uppercase text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] text-canvas-white mb-8">
        {question}
      </h2>
      <div className={`grid ${columns} gap-3`}>
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`px-5 py-4 border font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                active
                  ? "border-canvas-white bg-canvas-white text-canvas-black"
                  : "border-canvas-white/30 text-canvas-white hover:border-canvas-white"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </>
  );
}

function ContactStep({
  state,
  setState,
}: {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  const { t } = useLang();
  const upd = <K extends keyof State>(k: K, v: State[K]) =>
    setState((p) => ({ ...p, [k]: v }));

  return (
    <>
      <h2 className="font-display uppercase text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] text-canvas-white mb-8">
        {t("orcamento.form.q4")}
      </h2>
      <div className="space-y-5">
        <Field
          label={t("orcamento.form.nome")}
          value={state.name}
          onChange={(v) => upd("name", v)}
          type="text"
        />
        <Field
          label={t("orcamento.form.email")}
          value={state.email}
          onChange={(v) => upd("email", v)}
          type="email"
        />
        <Field
          label={t("orcamento.form.telefone")}
          value={state.phone}
          onChange={(v) => upd("phone", v)}
          type="tel"
        />
        <Field
          label={t("orcamento.form.empresa")}
          value={state.company}
          onChange={(v) => upd("company", v)}
          type="text"
          optional
        />

        {/* Honeypot — invisível */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "-9999px",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={state.website}
              onChange={(e) => upd("website", e.target.value)}
            />
          </label>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: "text" | "email" | "tel";
  optional?: boolean;
}) {
  const { t } = useLang();
  const required = !optional;
  const invalid =
    required &&
    value.length > 0 &&
    type === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return (
    <label className="block">
      <span className="flex items-center justify-between mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
        <span>
          {label}
          {required && (
            <span className="text-accent-grade ml-1" aria-hidden>
              *
            </span>
          )}
        </span>
        {optional && (
          <span className="opacity-60">{t("orcamento.form.opcional")}</span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required}
        aria-invalid={invalid || undefined}
        autoComplete={
          type === "email"
            ? "email"
            : type === "tel"
              ? "tel"
              : label.toLowerCase().includes("nome") ||
                  label.toLowerCase().includes("name")
                ? "name"
                : "organization"
        }
        className="w-full bg-transparent border-b border-canvas-white/25 focus:border-canvas-white aria-[invalid]:border-accent-grade outline-none font-body text-[clamp(1rem,1.5vw,1.25rem)] text-canvas-white py-2 transition-colors"
      />
    </label>
  );
}
