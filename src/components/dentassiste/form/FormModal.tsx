import { useState } from "react";
import { X, ArrowLeft, ArrowRight, Check, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { newInstrument, type Instrument } from "@/lib/dentassiste-data";
import { ProgressStepper } from "./ProgressStepper";
import { InstrumentCard } from "./InstrumentCard";
import { PriceSummary } from "./PriceSummary";
import { Field, Lbl } from "./Field";
import { Link } from "react-router-dom";

interface FormModalProps {
  onClose: () => void;
}

export function FormModal({ onClose }: FormModalProps) {
  const [step, setStep] = useState(0);
  const [instruments, setInst] = useState<Instrument[]>([newInstrument()]);
  const [nome, setNome] = useState("");
  const [clinica, setClinica] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [morada, setMorada] = useState("");
  const [codPostal, setCodPostal] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [observacoes, setObs] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nTurbines = instruments.filter((i) => i.type === "turbina").length;
  const upd = (id: number, v: Instrument) => setInst((p) => p.map((i) => (i.id === id ? v : i)));
  const rem = (id: number) => setInst((p) => p.filter((i) => i.id !== id));
  const add = () => setInst((p) => [...p, newInstrument()]);

  const step0Valid = instruments.length > 0 && instruments.every((i) => i.type !== "");
  const step1Valid = nome && clinica && telefone && email && morada && codPostal && localidade && rgpd;
  const canAdvance = step === 0 ? step0Valid : step === 1 ? step1Valid : true;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-primary-deep/85 p-4 backdrop-blur-md animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-card shadow-elevated">
        <div className="gradient-hero sticky top-0 z-10 flex items-center justify-between px-6 py-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/55">Dentassiste</div>
            <div className="font-display text-lg font-bold text-primary-foreground">Pedido de Recolha</div>
          </div>
          <button
            type="button"
            onClick={onClose}
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
              <h2 className="font-display text-2xl font-bold text-foreground">Pedido registado com sucesso</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Entraremos em contacto para confirmar os detalhes e programar a recolha.
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
                  <h2 className="font-display text-lg font-bold text-foreground">Que equipamento pretende enviar?</h2>
                  <p className="mb-5 mt-1 text-sm text-muted-foreground">
                    Pode incluir mais do que um equipamento no mesmo pedido.
                  </p>
                  {instruments.map((inst, idx) => (
                    <InstrumentCard
                      key={inst.id}
                      inst={inst}
                      index={idx}
                      nTurbines={nTurbines}
                      onChange={(v) => upd(inst.id, v)}
                      onRemove={() => rem(inst.id)}
                      canRemove={instruments.length > 1}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={add}
                    className="w-full rounded-lg border-2 border-dashed border-accent/60 bg-transparent px-4 py-3 text-sm font-bold text-accent transition-colors hover:border-accent hover:bg-accent-soft/50"
                  >
                    + Adicionar outro instrumento
                  </button>
                  <PriceSummary instruments={instruments} />
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Dados de contacto e recolha</h2>
                  <p className="mb-5 mt-1 text-sm text-muted-foreground">
                    Necessários para validar o pedido e programar a recolha.
                  </p>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-3">
                      <Field label="Nome" value={nome} onChange={setNome} placeholder="Nome do responsável" half />
                      <Field label="Clínica / Entidade" value={clinica} onChange={setClinica} placeholder="Nome da clínica" half />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Field label="Telefone" value={telefone} onChange={setTelefone} type="tel" placeholder="9XX XXX XXX" half />
                      <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="email@clinica.pt" half />
                    </div>
                    <Field label="Morada" value={morada} onChange={setMorada} placeholder="Rua e número de porta" />
                    <div className="flex flex-wrap gap-3">
                      <Field
                        label="Código postal"
                        value={codPostal}
                        onChange={(v) => {
                          const d = v.replace(/\D/g, "").slice(0, 7);
                          setCodPostal(d.length > 4 ? d.slice(0, 4) + "-" + d.slice(4) : d);
                        }}
                        placeholder="XXXX-XXX"
                        half
                      />
                      <Field label="Localidade" value={localidade} onChange={setLocalidade} placeholder="Localidade" half />
                    </div>
                    <div>
                      <Lbl optional>Observações</Lbl>
                      <textarea
                        value={observacoes}
                        onChange={(e) => setObs(e.target.value)}
                        placeholder="Horário preferencial ou informações adicionais..."
                        rows={3}
                        className="w-full resize-y rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div className="flex items-start gap-2 rounded-lg border border-accent/30 bg-accent-soft px-3.5 py-2.5 text-xs leading-relaxed text-accent-dark">
                      <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        Nas reparações de turbinas, a recolha e a entrega estão incluídas no preço. Os detalhes de
                        agendamento serão confirmados por contacto directo.
                      </span>
                    </div>
                    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg bg-muted/60 p-3.5 text-sm leading-relaxed text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={rgpd}
                        onChange={(e) => setRgpd(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent"
                      />
                      <span>
                        Li e aceito a{" "}
                        <Link to="/privacidade" className="font-semibold text-accent-dark underline-offset-2 hover:underline">
                          Política de Privacidade
                        </Link>
                        . Os dados fornecidos serão utilizados exclusivamente para responder a este pedido, em
                        conformidade com o RGPD. <strong className="text-foreground">Campo obrigatório.</strong>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Confirmar pedido</h2>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">Verifique os dados antes de enviar.</p>
                  <div className="space-y-1.5 rounded-lg bg-muted/60 p-4 text-sm leading-relaxed text-muted-foreground">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                      Dados de recolha
                    </div>
                    <div><strong className="text-foreground">Nome:</strong> {nome}</div>
                    <div><strong className="text-foreground">Clínica:</strong> {clinica}</div>
                    <div><strong className="text-foreground">Morada:</strong> {morada}, {codPostal} {localidade}</div>
                    <div><strong className="text-foreground">Contacto:</strong> {telefone} · {email}</div>
                    {observacoes && <div><strong className="text-foreground">Obs:</strong> {observacoes}</div>}
                  </div>
                  <PriceSummary instruments={instruments} />
                  <div className="mt-3 rounded-lg border border-accent/30 bg-accent-soft px-3.5 py-2.5 text-xs leading-relaxed text-accent-dark">
                    Após o envio, entraremos em contacto para confirmar os detalhes e marcar a recolha.
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-2.5">
                {step > 0 && (
                  <Button onClick={() => setStep((s) => s - 1)} variant="outline" className="flex-1">
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                )}
                <Button
                  onClick={step === 2 ? () => setSubmitted(true) : () => setStep((s) => s + 1)}
                  disabled={!canAdvance}
                  variant="hero"
                  className={cn("flex-[2]")}
                >
                  {step === 2 ? (<><Check className="h-4 w-4" /> Enviar pedido</>)
                    : step === 1 ? (<>Rever pedido <ArrowRight className="h-4 w-4" /></>)
                    : (<>Continuar <ArrowRight className="h-4 w-4" /></>)}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
