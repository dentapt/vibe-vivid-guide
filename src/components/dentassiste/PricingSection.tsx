import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  onForm: () => void;
}

const featured = {
  label: "Reparação de turbina", price: "160€", sub: "+ IVA · por unidade", highlight: true,
  includes: [
    "Substituição do rotor com rolamentos cerâmicos",
    "Limpeza completa",
    "Testes de funcionamento",
    "Recolha e entrega",
  ],
  extra: "Se forem necessárias peças adicionais, enviamos orçamento antes de intervir.",
};

const rows = [
  { label: "Turbinas Coxo e Soco", price: "100€", sub: "+ IVA · por unidade", note: "Mesmo serviço incluído" },
  { label: "2 ou mais turbinas", price: "−10€", sub: "por unidade", note: "Desconto aplicado a todas as turbinas do pedido", isDiscount: true },
  { label: "Limpeza / Broca presa", price: "45€", sub: "+ IVA", note: "Turbinas, contra-ângulos e peças de mão retas" },
  { label: "Contra-ângulo com avaria", price: "Orçamento", sub: "após diagnóstico", note: "Diagnóstico gratuito", isQuote: true },
  { label: "Micromotor", price: "Orçamento", sub: "após diagnóstico", note: "Diagnóstico gratuito", isQuote: true },
  { label: "Peça de Mão Reta", price: "Orçamento", sub: "após diagnóstico", note: "Diagnóstico gratuito", isQuote: true },
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
            Informamos o valor antes de iniciar a intervenção.
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
            <div className="mx-auto mt-6 max-w-xs border-t border-primary-foreground/10 pt-5 text-left">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground/60">
                Inclui
              </div>
              <ul className="space-y-2">
                {featured.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-snug text-primary-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
                <li className="flex items-start gap-2 text-sm leading-snug text-primary-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <Link to="/termos#garantia" className="underline decoration-primary-foreground/30 underline-offset-2 transition-colors hover:text-accent">
                    Garantia de 12 meses
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-5 text-xs leading-relaxed text-primary-foreground/60">
              {featured.extra}
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
