import { Truck } from "lucide-react";
import {
  type Instrument, EQUIPMENT_TYPES, TURBINE_BRANDS, TURBINE_SERVICES, CA_SERVICES,
} from "@/lib/dentassiste-data";

/** Resumo dos equipamentos do pedido (sem preços). */
export function PriceSummary({ instruments }: { instruments: Instrument[] }) {
  const visible = instruments.filter((i) => i.type);
  if (visible.length === 0) return null;
  const hasTurbineRepair = instruments.some((i) => i.type === "turbina" && i.serviceId === "reparacao");
  return (
    <div className="gradient-hero my-4 rounded-xl p-5 text-primary-foreground shadow-elevated">
      <div className="mb-3 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/50">
        Equipamentos a recolher
      </div>
      {visible.map((inst, idx) => {
        const eq = EQUIPMENT_TYPES.find((e) => e.id === inst.type);
        const svcLabel =
          inst.type === "turbina" ? TURBINE_SERVICES.find((s) => s.id === inst.serviceId)?.label
          : inst.type === "contra-angulo" ? CA_SERVICES.find((s) => s.id === inst.serviceId)?.label
          : "Diagnóstico e reparação";
        const brandLabel = TURBINE_BRANDS.find((b) => b.id === inst.brand)?.label || inst.brand;
        const name = [eq?.label, brandLabel].filter(Boolean).join(" · ");
        return (
          <div key={inst.id} className="mb-1.5 flex justify-between gap-3 text-xs">
            <span className="flex-1 opacity-85">{idx + 1}. {name}</span>
            {svcLabel && <span className="whitespace-nowrap font-semibold opacity-85">{svcLabel}</span>}
          </div>
        );
      })}
      {hasTurbineRepair && (
        <div className="mt-3 flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/15 px-3 py-2 text-[11px] font-medium text-accent">
          <Truck className="h-3 w-3" /> Recolha e entrega incluídas na reparação de turbinas
        </div>
      )}
      <div className="mt-3 text-[11px] leading-relaxed text-primary-foreground/50">
        Se forem necessárias peças adicionais, enviamos orçamento antes de intervir.
      </div>
    </div>
  );
}
