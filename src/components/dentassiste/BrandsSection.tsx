import { BRANDS_LOGOS } from "@/lib/dentassiste-data";

export function BrandsSection() {
  return (
    <section id="marcas" className="border-t border-border bg-background py-16">
      <div className="container max-w-5xl text-center">
        <div className="mb-8 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Trabalhamos com todas as marcas
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {BRANDS_LOGOS.map((b) => (
            <div
              key={b}
              className="rounded-lg border border-border bg-card px-6 py-3 font-display text-base font-semibold text-foreground/70 transition-smooth hover:border-accent/40 hover:text-foreground"
            >
              {b}
            </div>
          ))}
          <div className="rounded-lg border border-accent/30 bg-accent-soft px-6 py-3 text-sm font-semibold text-accent-dark">
            + outras marcas
          </div>
        </div>
      </div>
    </section>
  );
}
