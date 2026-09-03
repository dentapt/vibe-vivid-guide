import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Aviso discreto, não bloqueante, de que o site se destina a profissionais de saúde.
 * Renderizado acima do Navbar; não é sticky para não aumentar a altura do header fixo.
 */
export function ProfessionalNotice() {
  return (
    <div role="note" aria-label="Aviso de público-alvo" className="border-b border-white/[0.06] bg-primary-deep">
      <div className="container flex min-h-8 items-center justify-center gap-2 py-1.5 text-center text-xs leading-snug text-primary-foreground/65">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        <p>
          <span className="sm:hidden">Destinado a profissionais de saúde oral.</span>
          <span className="hidden sm:inline">
            Conteúdos e equipamentos destinados exclusivamente a profissionais de saúde oral.
          </span>
          <Link
            to="/aviso-legal"
            className="ml-1.5 hidden underline decoration-primary-foreground/30 underline-offset-2 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-primary-deep sm:inline"
          >
            Aviso legal
          </Link>
        </p>
      </div>
    </div>
  );
}
