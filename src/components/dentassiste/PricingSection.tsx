import { ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onForm: () => void;
}

const featured = {
  label: "Reparação de turbina", price: "160€", sub: "+ IVA · por unidade", note: "Recolha e entrega incluídas · Garantia 12 meses", highlight: true,
};

const rows = [
  { label: "Turbina — marcas low-cost", price: "100€", sub: "+ IVA · por unidade", note: "Soco, Coxo e equivalentes" },
  { label: "2 ou mais turbinas", price: "−10€", sub: "por unidade", note: "Desconto aplicado a todas as turbinas do pedido", isDiscount: true },
  { label: "Limpeza / Broca presa", price: "45€", sub: "+ IVA", note: "Turbinas e contra-ângulos" },
  { label: "Contra-ângulo com avaria", price: "Orçamento", sub: "após diagnóstico", note: "Informamos o valor antes de intervir", isQuote: true },
  { label: "Micromotor", price: "Orçamento", sub: "após diagnóstico", note: "Informamos o valor antes de intervir", isQuote: true },
  { label: "Peça de Mão Reta", price: "Orçamento", sub: "após diagnóstico", note: "Informamos o valor antes de intervir", isQuote: true },
];

export function PricingSection({ onForm }: PricingSectionProps) {
  return (
    <section id="precos" className="bg-secondary/40 py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">Preços transparentes</div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Sem surpresas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Informamos o valor antes de iniciar qualquer intervenção.
          </p>
        </div>

        <div className="mx-auto mb-6 max-w-xl">
          <div className="relative -translate-y-1 overflow-hidden rounded-xl border border-primary-deep p-8 text-center gradient-hero text-primary-foreground shadow-elevated">
            <div className="absolute inset-x-0 top-0 h-1 gradient-accent" />
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground/60">
              {featured.label}
            </div>
            <div className="mt-3 font-display text-5xl font-bold text-accent">
              {featured.price}
            </div>
            <div className="mt-1 text-xs text-primary-foreground/50">
              {featured.sub}
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold leading-snug text-accent">
              <Truck className="h-3.5 w-3.5" />
              {featured.note}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => (
            <div
              key={r.label}
              className="relative overflow-hidden rounded-xl border border-border bg-card p-6 text-center text-foreground shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                {r.label}
              </div>
              <div
                className={`mt-3 font-display font-bold ${r.isQuote ? "text-xl italic" : "text-4xl"} ${
                  r.isDiscount ? "text-accent" : "text-foreground"
                }`}
              >
                {r.price}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {r.sub}
              </div>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold leading-snug text-accent-dark">
                {r.note}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button onClick={onForm} variant="hero" size="xl" className="group">
            Fazer pedido de recolha
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
