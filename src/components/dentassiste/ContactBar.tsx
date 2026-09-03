import { Phone, Clock, MapPin } from "lucide-react";

const items = [
  { icon: Phone, title: "938 936 586", sub: "Chamada para rede móvel nacional", href: "tel:+351938936586" },
  { icon: Clock, title: "Seg – Sex", sub: "09h00 – 18h00" },
  { icon: MapPin, title: "Portugal continental", sub: "Recolhas em todo o país" },
];

export function ContactBar() {
  return (
    <section className="border-y border-border bg-card py-8">
      <div className="container flex flex-wrap items-center justify-center gap-8">
        {items.map(({ icon: Icon, title, sub, href }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                {href ? (
                  <a href={href} className="transition-colors hover:text-accent">
                    {title}
                  </a>
                ) : (
                  title
                )}
              </div>
              <div className="text-xs text-muted-foreground">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
