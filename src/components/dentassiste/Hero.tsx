import { ArrowRight, ShieldCheck, Truck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-turbine.jpg";

interface HeroProps {
  onForm: () => void;
}

const badges = [
  { icon: ShieldCheck, label: "Garantia 12 meses" },
  { icon: Truck, label: "Recolha incluída" },
  { icon: Search, label: "Orçamento prévio" },
];

export function Hero({ onForm }: HeroProps) {
  return (
    <section id="top" className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-60" style={{ background: "var(--gradient-radial-glow)" }} />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary-foreground/[0.02] blur-3xl" />
      <div className="absolute right-0 top-0 h-1 w-full gradient-accent" />

      <div className="container relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent animate-fade-in">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Reparação Multimarca · Portugal Continental
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground text-balance sm:text-6xl lg:text-[4.5rem] animate-fade-in-up">
            A turbina avariou?
            <br />
            <span className="text-accent">Nós tratamos de tudo.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            Reparação de turbinas, contra-ângulos e micromotores de todas as marcas. Recolha na clínica e entrega após
            reparação incluídas. Garantia de 12 meses.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <Button onClick={onForm} variant="hero" size="xl" className="group">
              Pedir Recolha
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <a href="#precos">Ver preços</a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-primary-foreground/10 pt-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-primary-foreground/65">
                <Icon className="h-4 w-4 text-accent" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elevated ring-1 ring-primary-foreground/10">
            <img
              src={heroImage}
              alt="Turbina dentária em macro fotografia"
              className="h-full w-full object-cover"
              width={1536}
              height={1024}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-card p-4 shadow-elevated sm:block">
            <div className="text-3xl font-bold font-display text-foreground">160€</div>
            <div className="text-xs text-muted-foreground">Reparação de turbina, +IVA</div>
            <div className="mt-1 text-[11px] font-semibold text-accent">Recolha incluída</div>
          </div>
        </div>
      </div>
    </section>
  );
}
