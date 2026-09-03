import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-dentassiste.png";

interface NavbarProps {
  onForm: () => void;
}

const navLinkClass =
  "hidden rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:block";

export function Navbar({ onForm }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-primary-deep/95 backdrop-blur-md">
      <nav aria-label="Principal" className="container flex h-16 items-center justify-between">
        <a
          href="#top"
          aria-label="Dentassiste — início"
          className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-deep"
        >
          <img src={logo} alt="Dentassiste" width={507} height={492} className="h-9 w-auto" />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-primary-foreground">Dentassiste</span>
            <span className="hidden whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50 min-[400px]:block">
              Assistência Técnica
            </span>
          </span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#servicos" className={navLinkClass}>
            Serviços
          </a>
          <a href="#precos" className={navLinkClass}>
            Preços
          </a>
          <Button onClick={onForm} variant="hero" size="sm">
            Pedir Recolha
          </Button>
        </div>
      </nav>
    </header>
  );
}
