import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onForm: () => void;
}

export function Navbar({ onForm }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/5 bg-primary-deep/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 ring-1 ring-accent/30">
            <Stethoscope className="h-5 w-5 text-accent" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-primary-foreground">Dentassiste</div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50">Assistência Técnica</div>
          </div>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#servicos" className="hidden rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground sm:block">
            Serviços
          </a>
          <a href="#precos" className="hidden rounded-md px-3 py-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground sm:block">
            Preços
          </a>
          <Button onClick={onForm} variant="hero" size="sm">
            Pedir Recolha
          </Button>
        </div>
      </div>
    </nav>
  );
}
