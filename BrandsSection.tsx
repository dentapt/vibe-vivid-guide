import { Link } from "react-router-dom";
import { BRANDS_LOGOS } from "@/lib/dentassiste-data";

export function BrandsSection() {
  return (
    <section id="marcas" className="border-t border-border bg-background py-16">
      <div className="container max-w-5xl text-center">
        <div className="mb-8 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Reparamos as principais marcas
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
        <p className="mx-auto mt-8 max-w-xl text-[11px] leading-relaxed text-muted-foreground">
          As marcas referidas pertencem aos respetivos titulares. A Dentassiste é uma empresa independente, sem vínculo
          a estes fabricantes.{" "}
          <Link to="/aviso-legal#marcas" className="underline underline-offset-2 hover:text-accent-dark">
            Saber mais
          </Link>
        </p>
      </div>
    </section>
  );
}
