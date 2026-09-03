import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-dentassiste.png";

export function Footer() {
  return (
    <footer className="bg-primary-deep">
      <div className="container py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left">
          <div>
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              <img src={logo} alt="Dentassiste" width={507} height={492} className="h-9 w-auto" />
              <div className="font-display text-base font-bold text-primary-foreground">Dentassiste</div>
            </div>
            <div className="text-sm leading-relaxed text-primary-foreground/55">
              Dentassiste Unipessoal Lda.
              <br />
              NIF 506 272 338
              <br />
              Braga / Barcelos
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
              Contacto
            </div>
            <div className="text-sm leading-relaxed text-primary-foreground/55">
              <a href="tel:+351938936586" className="transition-colors hover:text-accent">
                938 936 586
              </a>
              <br />
              (chamada para rede móvel nacional)
              <br />
              Recolhas em todo o país
            </div>
          </div>
          <div>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
              Informação Legal
            </div>
            <ul className="space-y-2 text-sm">
              {[
                ["Política de Privacidade", "/privacidade"],
                ["Termos e Condições", "/termos"],
                ["Aviso Legal", "/aviso-legal"],
                ["Política de Cookies", "/cookies"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-primary-foreground/55 transition-colors hover:text-accent">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.livroreclamacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary-foreground/55 transition-colors hover:text-accent"
                >
                  Livro de Reclamações <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/10 pt-6 text-center">
          <div className="text-xs leading-relaxed text-primary-foreground/40">
            O acesso a este site pressupõe o título de profissional de saúde nos termos do Decreto-Lei n.º 145/2009.
          </div>
          <div className="mt-2 text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Dentassiste Unipessoal Lda. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
