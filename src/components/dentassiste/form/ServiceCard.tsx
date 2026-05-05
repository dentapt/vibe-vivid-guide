import { Truck, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceDef } from "@/lib/dentassiste-data";

interface ServiceCardProps {
  svc: ServiceDef;
  selected: string;
  onClick: (id: string) => void;
  nTurbines: number;
  selectedBrand?: { lowCost?: boolean };
  equipmentType: string;
}

export function ServiceCard({ svc, selected, onClick, nTurbines, selectedBrand, equipmentType }: ServiceCardProps) {
  const on = selected === svc.id;
  const isTurbineRepair = svc.id === "reparacao" && equipmentType === "turbina";
  const isLowCost = selectedBrand?.lowCost ?? false;
  const basePrice = isTurbineRepair ? (isLowCost ? 100 : 160) : null;
  const displayPrice = isTurbineRepair
    ? `${basePrice}€ / unidade`
    : svc.priceLabel
    ? svc.priceLabel(nTurbines)
    : null;
  const discountLine = isTurbineRepair && basePrice ? `${basePrice - 10}€ a partir de 2` : null;
  const Icon = svc.icon;
  return (
    <div>
      <button
        type="button"
        onClick={() => onClick(svc.id)}
        className={cn(
          "flex w-full items-center justify-between gap-3 border p-3.5 text-left transition-smooth",
          on
            ? "border-accent bg-accent-soft"
            : "border-border bg-card hover:border-accent/40 hover:bg-accent-soft/40",
          on && svc.note ? "rounded-t-lg" : "rounded-lg",
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md", on ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground")}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <div>
            <div className={cn("text-sm font-bold", on ? "text-accent-dark" : "text-foreground")}>{svc.label}</div>
            <div className="text-[11px] leading-snug text-muted-foreground">{svc.desc}</div>
          </div>
        </div>
        <div className="min-w-[100px] text-right">
          {displayPrice ? (
            <>
              <div>
                <span className={cn("text-base font-extrabold", on ? "text-accent-dark" : "text-foreground")}>{displayPrice}</span>
                <span className="text-[10px] text-muted-foreground"> +IVA</span>
              </div>
              {discountLine && <div className="mt-0.5 text-[10px] text-muted-foreground">{discountLine}</div>}
              {isTurbineRepair && (
                <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-accent">
                  <Truck className="h-3 w-3" /> Recolha incluída
                </div>
              )}
            </>
          ) : (
            <span className="text-xs italic text-muted-foreground">sob orçamento</span>
          )}
        </div>
      </button>
      {on && svc.note && (
        <div className="flex items-center gap-2 rounded-b-lg border border-t-0 border-accent bg-accent-soft px-3.5 py-2 text-[11px] font-medium text-accent-dark">
          <Award className="h-3.5 w-3.5" /> {svc.note}
        </div>
      )}
    </div>
  );
}

export function BrandChip({ brand, selected, onClick }: { brand: { id: string; label: string }; selected: string; onClick: (id: string) => void }) {
  const on = selected === brand.id;
  return (
    <button
      type="button"
      onClick={() => onClick(brand.id)}
      className={cn(
        "rounded-md border px-3.5 py-2 text-xs font-bold transition-smooth",
        on ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-card text-foreground hover:border-accent/40",
      )}
    >
      {brand.label}
    </button>
  );
}
