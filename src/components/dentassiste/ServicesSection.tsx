import { SERVICES_LIST } from "@/lib/dentassiste-data";

export function ServicesSection() {
  return (
    <section id="servicos" className="border-y border-border bg-background py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">O que fazemos</div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Assistência técnica especializada
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Reparação multimarca com componentes compatíveis de qualidade e garantia incluída.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-soft text-accent transition-smooth group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
