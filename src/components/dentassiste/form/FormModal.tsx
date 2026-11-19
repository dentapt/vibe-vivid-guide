import { useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight, Check, CheckCircle2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EQUIPMENT_TYPES, newInstrument, type Instrument } from "@/lib/dentassiste-data";
import { ProgressStepper } from "./ProgressStepper";
import { Field, Lbl } from "./Field";
import { Link } from "react-router-dom";

interface FormModalProps {
  onClose: () => void;
}

/** Serviços a escolher por tipo de equipamento (micromotor e peça de mão reta: só diagnóstico). */
const SERVICE_OPTIONS: Record<string, { id: string; label: string }[]> = {
  turbina: [
    { id: "reparacao", label: "Reparação" },
    { id: "limpeza-broca", label: "Limpeza / Broca presa" },
  ],
  "contra-angulo": [
    { id: "reparacao", label: "Reparação" },
    { id: "limpeza-broca", label: "Limpeza / Broca presa" },
  ],
};

const TIPO_LABEL: Record<string, string> = Object.fromEntries(EQUIPMENT_TYPES.map((e) => [e.id, e.label]));
const SERVICE_LABEL: Record<string, string> = { reparacao: "Reparação", "limpeza-broca": "Limpeza / Broca presa" };

const needsService = (i: Instrument) => !!SERVICE_OPTIONS[i.type];
const itemValid = (i: Instrument) => i.type !== "" && (!needsService(i) || i.serviceId !== "");

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = (v: string) => v.replace(/\D/g, "").length >= 9;

export function FormModal({ onClose }: FormModalProps) {
  const [step, setStep] = useState(0);
  const [tried, setTried] = useState([false, false]);
  const [instruments, setInst] = useState<Instrument[]>([newInstrument()]);
  const [nome, setNome] = useState("");
  const [clinica, setClinica] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [morada, setMorada] = useState("");
  const [observacoes, setObs] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  // Impede a página de fundo de rolar enquanto o formulário está aberto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const upd = (id: number, v: Instrument) => setInst((p) => p.map((i) => (i.id === id ? v : i)));
  const rem = (id: number) => setInst((p) => p.filter((i) => i.id !== id));
  const add = () => setInst((p) => [...p, newInstrument()]);

  const errors = {
    nome: !nome.trim() && "Indique o seu nome",
    clinica: !clinica.trim() && "Indique a clínica",
    telefone: !isPhone(telefone) && "Indique um telefone válido",
    email: !isEmail(email) && "Indique um email válido",
    localidade: !localidade.trim() && "Indique a localidade",
    rgpd: !rgpd && "É necessário aceitar a Política de Privacidade",
  };
  const step0Valid = instruments.every(itemValid);
  const step1Valid = Object.values(errors).every((e) => !e);
  const showErr = tried[1];

  const markTried = (s: number) => setTried((t) => t.map((v, i) => (i === s ? true : v)));

  const next = () => {
    markTried(0);
    if (step0Valid) setStep(1);
  };

  const handleSubmit = async () => {
    markTried(1);
    if (!step1Valid) return;
    setSending(true);
    setSendError(false);
    try {
      const equipamento = instruments
        .map((i, idx) => {
          const partes = [`${idx + 1}. ${TIPO_LABEL[i.type] || i.type} × ${i.qty}`];
          if (i.serviceId) partes.push(`Serviço: ${SERVICE_LABEL[i.serviceId] || i.serviceId}`);
          if (i.notes.trim()) partes.push(`Detalhes: ${i.notes.trim()}`);
          return partes.join(" | ");
        })
        .join("\n");

      const encode = (data: Record<string, string>) =>
        Object.entries(data)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&");

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "pedido-recolha",
          nome, clinica, telefone, email, morada,
          codPostal: "",
          localidade, observacoes, equipamento,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-primary-deep/85 p-4 backdrop-blur-md animate-fade-in">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-card shadow-elevated"
      >
        <div className="gradient-hero flex items-center justify-between px-6 py-4">
          <div id="form-title" className="font-display text-lg font-bold text-primary-foreground">
            Pedido de Recolha
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground/15 text-primary-foreground transition-colors hover:bg-primary-foreground/25"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft">
                <CheckCircle2 className="h-9 w-9 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Pedido enviado</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Vamos contactá-lo para combinar a recolha.
              </p>
              <Button onClick={onClose} variant="hero" size="lg" className="mt-6">
                Fechar
              </Button>
            </div>
          ) : (
            <>
              <ProgressStepper step={step} />

              {step === 0 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-bold text-foreground">O que vamos recolher?</h2>
                  <div className="flex flex-col gap-3">
                    {instruments.map((inst, idx) => (
                      <EquipmentRow
                        key={inst.id}
                        inst={inst}
                        index={idx}
                        showErrors={tried[0]}
                        onChange={(v) => upd(inst.id, v)}
                        onRemove={instruments.length > 1 ? () => rem(inst.id) : undefined}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={add}
                    className="mt-3 w-full rounded-lg border-2 border-dashed border-accent/50 px-4 py-2.5 text-sm font-bold text-accent transition-colors hover:border-accent hover:bg-accent-soft/50"
                  >
                    + Outro tipo de equipamento
                  </button>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="mb-4 font-display text-lg font-bold text-foreground">Os seus dados</h2>
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-wrap gap-3">
                      <Field label="Nome" value={nome} onChange={setNome} autoComplete="name" half error={showErr && errors.nome} />
                      <Field label="Clínica" value={clinica} onChange={setClinica} autoComplete="organization" half error={showErr && errors.clinica} />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Field label="Telefone" value={telefone} onChange={setTelefone} type="tel" autoComplete="tel" half error={showErr && errors.telefone} />
                      <Field label="Email" value={email} onChange={setEmail} type="email" autoComplete="email" half error={showErr && errors.email} />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Field label="Localidade" value={localidade} onChange={setLocalidade} autoComplete="address-level2" half error={showErr && errors.localidade} />
                      <Field label="Morada" optional value={morada} onChange={setMorada} autoComplete="street-address" half />
                    </div>
                    <div>
                      <Lbl optional>Observações</Lbl>
                      <textarea
                        value={observacoes}
                        onChange={(e) => setObs(e.target.value)}
                        placeholder="Ex.: melhor horário para a recolha"
                        rows={2}
                        className="w-full resize-y rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={rgpd}
                          onChange={(e) => setRgpd(e.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-accent"
                        />
                        <span>
                          Li e aceito a{" "}
                          <Link
                            to="/privacidade"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-accent-dark underline-offset-2 hover:underline"
                          >
                            Política de Privacidade
                          </Link>
                          .
                        </span>
                      </label>
                      {showErr && errors.rgpd && <p className="mt-1 text-[11px] font-medium text-destructive">{errors.rgpd}</p>}
                    </div>
                  </div>
                </div>
              )}

              {sendError && (
                <div role="alert" className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm leading-relaxed text-destructive">
                  Não foi possível enviar o pedido. Tente novamente ou ligue-nos:{" "}
                  <a href="tel:+351938936586" className="font-bold underline">938 936 586</a>.
                </div>
              )}

              <div className="mt-6 flex gap-2.5">
                {step > 0 && (
                  <Button onClick={() => setStep(0)} variant="outline" className="flex-1">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                )}
                {step === 0 ? (
                  <Button onClick={next} variant="hero" className="flex-[2]">
                    Continuar <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={sending} variant="hero" className="flex-[2]">
                    {sending ? "A enviar..." : <><Check className="h-4 w-4" /> Enviar pedido</>}
                  </Button>
                )}
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Prefere ligar?{" "}
                <a href="tel:+351938936586" className="font-semibold text-accent-dark">938 936 586</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EquipmentRow({
  inst, index, showErrors, onChange, onRemove,
}: {
  inst: Instrument;
  index: number;
  showErrors: boolean;
  onChange: (v: Instrument) => void;
  onRemove?: () => void;
}) {
  const [showNotes, setShowNotes] = useState(inst.notes !== "");
  const services = SERVICE_OPTIONS[inst.type];
  const missingType = showErrors && inst.type === "";
  const missingService = showErrors && inst.type !== "" && needsService(inst) && inst.serviceId === "";

  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Equipamento {index + 1}
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remover equipamento ${index + 1}`}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {EQUIPMENT_TYPES.map((et) => {
          const on = inst.type === et.id;
          const Icon = et.icon;
          return (
            <button
              key={et.id}
              type="button"
              onClick={() => onChange({ ...inst, type: et.id, serviceId: "" })}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-bold transition-smooth",
                on ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-card text-foreground hover:border-accent/40",
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", on ? "text-accent" : "text-muted-foreground")} />
              {et.label}
            </button>
          );
        })}
      </div>
      {missingType && <p className="mt-1.5 text-[11px] font-medium text-destructive">Escolha o tipo de equipamento</p>}

      {services && (
        <div className="mt-3.5">
          <Lbl>Serviço</Lbl>
          <div className="grid grid-cols-2 gap-2">
            {services.map((sv) => {
              const on = inst.serviceId === sv.id;
              return (
                <button
                  key={sv.id}
                  type="button"
                  onClick={() => onChange({ ...inst, serviceId: sv.id })}
                  className={cn(
                    "min-h-9 rounded-md border px-2 py-2 text-xs font-bold transition-smooth",
                    on ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-foreground hover:border-accent/40",
                  )}
                >
                  {sv.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {missingService && <p className="mt-1.5 text-[11px] font-medium text-destructive">Escolha o serviço</p>}

      {inst.type && (
        <div className="mt-3.5 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground">Quantidade</span>
          <div className="inline-flex items-center rounded-md border border-border">
            <button
              type="button"
              aria-label="Menos"
              onClick={() => onChange({ ...inst, qty: Math.max(1, inst.qty - 1) })}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={inst.qty <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-foreground">{inst.qty}</span>
            <button
              type="button"
              aria-label="Mais"
              onClick={() => onChange({ ...inst, qty: Math.min(50, inst.qty + 1) })}
              className="flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {inst.type && (
        <div className="mt-3">
          {showNotes ? (
            <textarea
              value={inst.notes}
              onChange={(e) => onChange({ ...inst, notes: e.target.value })}
              placeholder="Marca, modelo ou o problema que notou"
              rows={2}
              autoFocus
              className="w-full resize-y rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="text-xs font-semibold text-accent-dark hover:underline"
            >
              + Marca, modelo ou problema (opcional)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
