import { Truck } from "lucide-react";
import {
  type Instrument, EQUIPMENT_TYPES, TURBINE_BRANDS, TURBINE_SERVICES, CA_SERVICES,
  getInstPrice, calcTotal,
} from "@/lib/dentassiste-data";

export function PriceSummary({ instruments }: { instruments: Instrument[] }) {
  const nT = instruments.filter((i) => i.type === "turbina").length;
  const { total, hasKnown, hasUnknown } = calcTotal(instruments);
  const visible = instruments.filter(
    (i) => i.type && (i.type === "micromotor" || i.type === "peca-mao-reta" || i.serviceId),
  );
  if (visible.length === 0) return null;
  const hasTurbineRepair = instruments.some((i) => i.type === "turbina" && i.serviceId === "reparacao");
  return (
    <div className="gradient-hero my-4 rounded-xl p-5 text-primary-foreground shadow-elevated">
      <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50">
        Estimativa do pedido
      </div>
      {visible.map((inst) => {
        const eq = EQUIPMENT_TYPES.find((e) => e.id === inst.type);
        const p = getInstPrice(inst, nT);
        const svcLabel =
          inst.type === "turbina" ? TURBINE_SERVICES.find((s) => s.id === inst.serviceId)?.label
          : inst.type === "contra-angulo" ? CA_SERVICES.find((s) => s.id === inst.serviceId)?.label
          : inst.type === "peca-mao-reta" ? "Reparação"
          : null;
        const brandLabel = TURBINE_BRANDS.find((b) => b.id === inst.brand)?.label || inst.brand;
        const name = [eq?.label, brandLabel, svcLabel].filter(Boolean).join(" · ");
        const ps = typeof p === "number" ? `${p}€` : "orçamento";
        return (
          <div key={inst.id} className="mb-1 flex justify-between gap-3 text-xs opacity-85">
            <span className="flex-1">{name}</span>
            <span className="whitespace-nowrap font-bold">{ps}</span>
          </div>
        );
      })}
      {nT >= 2 && (
        <div className="mt-3 rounded-md border border-accent/30 bg-accent/15 px-3 py-2 text-[11px] font-medium text-accent">
          Desconto de 10€ por turbina aplicado (2 ou mais unidades)
        </div>
      )}
      {hasTurbineRepair && (
        <div className="mt-2 flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/15 px-3 py-2 text-[11px] font-medium text-accent">
          <Truck className="h-3 w-3" /> Recolha e entrega incluídas no preço estimado
        </div>
      )}
      {hasKnown && (
        <div className="mt-3 flex items-baseline justify-between border-t border-primary-foreground/15 pt-3">
          <span className="text-xs opacity-55">{hasUnknown ? "Total parcial estimado" : "Total estimado"}</span>
          <span className="text-2xl font-extrabold">
            {total}€<span className="text-xs font-normal opacity-50"> + IVA</span>
          </span>
        </div>
      )}
      {hasUnknown && (
        <div className="mt-1 text-[11px] text-primary-foreground/40">
          * Alguns serviços serão orçamentados após diagnóstico técnico
        </div>
      )}
    </div>
  );
}
