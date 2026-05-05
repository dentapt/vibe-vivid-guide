import { useState } from "react";
import { ChevronDown, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type Instrument,
  EQUIPMENT_TYPES, TURBINE_BRANDS, TURBINE_SERVICES, CA_SERVICES, OTHER_BRANDS,
  TURBINE_SYMPTOMS, CA_SYMPTOMS, MM_SYMPTOMS, PM_SYMPTOMS,
} from "@/lib/dentassiste-data";
import { Lbl, Field, Chips } from "./Field";
import { ServiceCard, BrandChip } from "./ServiceCard";

interface InstrumentCardProps {
  inst: Instrument;
  index: number;
  nTurbines: number;
  onChange: (v: Instrument) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function InstrumentCard({ inst, index, nTurbines, onChange, onRemove, canRemove }: InstrumentCardProps) {
  const [open, setOpen] = useState(true);
  const eq = EQUIPMENT_TYPES.find((e) => e.id === inst.type);
  const set = <K extends keyof Instrument>(field: K, val: Instrument[K]) => onChange({ ...inst, [field]: val });
  const symptoms =
    inst.type === "turbina" ? TURBINE_SYMPTOMS
    : inst.type === "contra-angulo" ? CA_SYMPTOMS
    : inst.type === "micromotor" ? MM_SYMPTOMS
    : inst.type === "peca-mao-reta" ? PM_SYMPTOMS
    : [];
  const brandLabel = TURBINE_BRANDS.find((b) => b.id === inst.brand)?.label || inst.brand;
  const EqIcon = eq?.icon;

  return (
    <div className={cn("mb-3 overflow-hidden rounded-xl border transition-colors", open ? "border-accent" : "border-border")}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn("flex w-full items-center justify-between gap-3 px-4 py-3", open ? "bg-accent-soft" : "bg-muted/40")}
      >
        <div className="flex items-center gap-3">
          {EqIcon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-card text-accent">
              <EqIcon className="h-4.5 w-4.5" />
            </div>
          )}
          <div className="text-left">
            <div className="text-sm font-bold text-foreground">
              Instrumento {index + 1}
              {eq ? ` — ${eq.label}` : ""}
            </div>
            {!open && (brandLabel || inst.model) && (
              <div className="text-xs text-muted-foreground">{[brandLabel, inst.model].filter(Boolean).join(" · ")}</div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canRemove && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        </div>
      </button>
      {open && (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <Lbl>Tipo de equipamento</Lbl>
            <div className="grid grid-cols-2 gap-2">
              {EQUIPMENT_TYPES.map((et) => {
                const on = inst.type === et.id;
                const Icon = et.icon;
                return (
                  <button
                    key={et.id}
                    type="button"
                    onClick={() =>
                      onChange({ ...inst, type: et.id, brand: "", serviceId: "", problems: [], problemOther: "" })
                    }
                    className={cn(
                      "relative flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-smooth",
                      on ? "border-accent bg-accent-soft" : "border-border bg-card hover:border-accent/40",
                    )}
                  >
                    <Icon className={cn("h-4 w-4", on ? "text-accent" : "text-muted-foreground")} />
                    <span className={cn("text-sm font-bold", on ? "text-accent-dark" : "text-foreground")}>{et.label}</span>
                    {et.highlight && (
                      <span className="absolute -top-1.5 right-2 rounded-sm bg-accent px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-accent-foreground">
                        Principal
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {inst.type === "turbina" && (
            <>
              <div>
                <Lbl optional>Marca</Lbl>
                <div className="flex flex-wrap gap-2">
                  {TURBINE_BRANDS.map((b) => (
                    <BrandChip key={b.id} brand={b} selected={inst.brand} onClick={(id) => set("brand", id)} />
                  ))}
                </div>
              </div>
              <div>
                <Lbl>Serviço pretendido</Lbl>
                <div className="flex flex-col gap-2">
                  {TURBINE_SERVICES.map((svc) => (
                    <ServiceCard
                      key={svc.id}
                      svc={svc}
                      selected={inst.serviceId}
                      onClick={(id) => set("serviceId", id)}
                      nTurbines={nTurbines}
                      selectedBrand={TURBINE_BRANDS.find((b) => b.id === inst.brand)}
                      equipmentType="turbina"
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {inst.type === "contra-angulo" && (
            <>
              <div>
                <Lbl optional>Marca</Lbl>
                <Chips options={OTHER_BRANDS} selected={inst.brand} onToggle={(b) => set("brand", b === inst.brand ? "" : b)} />
              </div>
              <div>
                <Lbl>Tipo de serviço</Lbl>
                <div className="flex flex-col gap-2">
                  {CA_SERVICES.map((svc) => (
                    <ServiceCard
                      key={svc.id}
                      svc={svc}
                      selected={inst.serviceId}
                      onClick={(id) => set("serviceId", id)}
                      nTurbines={nTurbines}
                      equipmentType="contra-angulo"
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {(inst.type === "micromotor" || inst.type === "peca-mao-reta") && (
            <>
              <div>
                <Lbl optional>Marca</Lbl>
                <Chips options={OTHER_BRANDS} selected={inst.brand} onToggle={(b) => set("brand", b === inst.brand ? "" : b)} />
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-warm/60 bg-warm/15 p-3.5 text-sm leading-relaxed text-warm-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {inst.type === "micromotor" ? "Os micromotores" : "As peças de mão retas"} são orçamentados após
                  diagnóstico técnico. Informamos o valor antes de iniciar qualquer intervenção.
                </span>
              </div>
            </>
          )}

          {inst.type && (
            <div className="flex flex-wrap gap-3">
              <Field label="Modelo" optional value={inst.model} onChange={(v) => set("model", v)} placeholder="ex: S-Max M500" half />
              <Field label="Nº de série" optional value={inst.serial} onChange={(v) => set("serial", v)} placeholder="ex: 12345678" half />
            </div>
          )}

          {inst.type && symptoms.length > 0 && (
            <div>
              <Lbl optional>Sintomas observados</Lbl>
              <Chips
                options={symptoms}
                selected={inst.problems}
                onToggle={(p) => {
                  const next = inst.problems.includes(p) ? inst.problems.filter((x) => x !== p) : [...inst.problems, p];
                  set("problems", next);
                }}
                multi
              />
              {inst.problems.includes("Outro") && (
                <textarea
                  value={inst.problemOther}
                  onChange={(e) => set("problemOther", e.target.value)}
                  placeholder="Descreva o problema..."
                  rows={2}
                  className="mt-2 w-full resize-y rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
