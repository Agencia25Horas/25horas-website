"use client";

import Link from "next/link";
import { useState } from "react";

const PROJECT_TYPES = [
  "HOSPITALIDADE",
  "MÚSICA",
  "DESPORTO",
  "INSTITUCIONAL",
  "IMOBILIÁRIO",
  "EVENTOS",
];

const DELIVERABLES = [
  "COMERCIAL",
  "FILME DE MARCA",
  "DOCUMENTÁRIO",
  "COBERTURA DE EVENTO",
  "SÉRIE BRANDED",
];

const TIMELINES = ["< 1 MÊS", "1 — 3 MESES", "> 3 MESES"];

type Step = 1 | 2 | 3 | 4 | 5; // 5 = confirmation

type State = {
  step: Step;
  projectType?: string;
  deliverable?: string;
  timeline?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

export function BudgetForm() {
  const [s, set] = useState<State>({
    step: 1,
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const next = () => set((p) => ({ ...p, step: (p.step + 1) as Step }));
  const back = () => set((p) => ({ ...p, step: (p.step - 1) as Step }));

  const submit = () => {
    // Prototype: log + move to confirmation. Production wires to /api/orcamento.
    console.info("[BudgetForm] submission", {
      projectType: s.projectType,
      deliverable: s.deliverable,
      timeline: s.timeline,
      name: s.name,
      email: s.email,
      phone: s.phone,
      company: s.company,
    });
    set((p) => ({ ...p, step: 5 }));
  };

  const canContinue = (() => {
    if (s.step === 1) return !!s.projectType;
    if (s.step === 2) return !!s.deliverable;
    if (s.step === 3) return !!s.timeline;
    if (s.step === 4) return s.name.length > 1 && /.+@.+\..+/.test(s.email);
    return false;
  })();

  // ---- Confirmation slate ----
  if (s.step === 5) {
    return (
      <div className="max-w-md w-full">
        <div className="slate-frame font-mono text-[11px] tracking-mono-wider text-canvas-white">
          <span className="corner-tr" aria-hidden />
          <span className="corner-bl" aria-hidden />
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-chrome-line">
            <span className="text-type-dim">CENA 01 · TAKE 04 · EM ESPERA</span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-signal-live rec-dot"
                aria-hidden
              />
              <span className="text-[9px] text-type-dim">SENT</span>
            </span>
          </div>
          <p lang="pt" className="text-type-neutral leading-relaxed normal-case tracking-normal">
            Obrigado. Vamos rever o pedido e responder em 24h, em PT ou EN.
          </p>
          <p className="mt-5 text-type-dim normal-case tracking-normal">
            Para algo urgente:
            <br />
            <span className="text-type-neutral">
              atendimento@25horasagency.com
              <br />
              +351 963 869 519
            </span>
          </p>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <Link
            href="/marcar"
            className="group inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white hover:text-accent-grade transition-colors duration-f-12"
          >
            MARCAR REUNIÃO DIRECTA
            <span
              className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // ---- Input steps ----
  return (
    <div className="max-w-2xl w-full">
      <div className="flex items-end justify-between mb-8 font-mono text-[10px] tracking-mono-wider text-type-dim">
        <span>CENA 01 · TAKE 0{s.step}</span>
        <span>PASSO {s.step} DE 4</span>
      </div>

      {s.step === 1 && (
        <ChipStep
          question="Que tipo de projeto?"
          options={PROJECT_TYPES}
          value={s.projectType}
          onChange={(v) => set((p) => ({ ...p, projectType: v }))}
          columns="grid-cols-2 md:grid-cols-3"
        />
      )}

      {s.step === 2 && (
        <ChipStep
          question="Que tipo de entregável?"
          options={DELIVERABLES}
          value={s.deliverable}
          onChange={(v) => set((p) => ({ ...p, deliverable: v }))}
          columns="grid-cols-1 md:grid-cols-2"
        />
      )}

      {s.step === 3 && (
        <ChipStep
          question="Em que prazo?"
          options={TIMELINES}
          value={s.timeline}
          onChange={(v) => set((p) => ({ ...p, timeline: v }))}
          columns="grid-cols-1 md:grid-cols-3"
        />
      )}

      {s.step === 4 && (
        <ContactStep state={s} setState={set} />
      )}

      {/* Footer nav */}
      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={back}
          disabled={s.step === 1}
          className="font-mono text-[11px] tracking-mono-wider text-type-dim hover:text-canvas-white transition-colors duration-f-12 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← VOLTAR
        </button>
        {s.step < 4 ? (
          <button
            onClick={next}
            disabled={!canContinue}
            className="group inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white disabled:text-type-dim disabled:cursor-not-allowed hover:text-accent-grade transition-colors duration-f-12"
          >
            CONTINUAR
            <span
              className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
              aria-hidden
            >
              →
            </span>
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!canContinue}
            className="group inline-flex items-center font-mono text-[11px] tracking-mono-wider text-canvas-white disabled:text-type-dim disabled:cursor-not-allowed hover:text-accent-grade transition-colors duration-f-12"
          >
            ENVIAR PEDIDO
            <span
              className="ml-2 inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-f-12"
              aria-hidden
            >
              →
            </span>
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
      <h2
        lang="pt"
        className="font-serif font-light text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-canvas-white mb-8"
      >
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
              className={`px-5 py-4 border font-mono text-[11px] tracking-mono-wider transition-colors duration-f-12 ${
                active
                  ? "border-accent-grade text-canvas-white bg-accent-grade/10"
                  : "border-chrome-line text-type-neutral hover:border-type-dim hover:text-canvas-white"
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
  const set = <K extends keyof State>(k: K, v: State[K]) =>
    setState((p) => ({ ...p, [k]: v }));

  return (
    <>
      <h2
        lang="pt"
        className="font-serif font-light text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-canvas-white mb-8"
      >
        Como vos contactamos?
      </h2>
      <div className="space-y-5">
        <Field label="NOME" value={state.name} onChange={(v) => set("name", v)} type="text" />
        <Field label="EMAIL" value={state.email} onChange={(v) => set("email", v)} type="email" />
        <Field label="TELEFONE" value={state.phone} onChange={(v) => set("phone", v)} type="tel" />
        <Field label="EMPRESA" value={state.company} onChange={(v) => set("company", v)} type="text" optional />
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
  return (
    <label className="block">
      <span className="flex items-center justify-between mb-2 font-mono text-[10px] tracking-mono-wider text-type-dim">
        <span>{label}</span>
        {optional && <span className="text-type-dim/60">opcional</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-chrome-line focus:border-accent-grade outline-none font-body text-[clamp(1rem,1.5vw,1.25rem)] text-canvas-white py-2 transition-colors duration-f-12"
      />
    </label>
  );
}
