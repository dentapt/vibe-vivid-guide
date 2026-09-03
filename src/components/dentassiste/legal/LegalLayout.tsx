import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-dentassiste.png";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-primary-deep">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Dentassiste" width={507} height={492} className="h-8 w-auto" />
            <Link to="/" className="font-display text-sm font-bold text-primary-foreground">Dentassiste</Link>
            <span className="text-primary-foreground/30">/</span>
            <span className="text-sm text-primary-foreground/60">{title}</span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary-foreground/20 px-3 py-1.5 text-xs text-primary-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
          </Link>
        </div>
      </nav>
      <main className="container max-w-3xl py-16 lg:py-20">
        <h1 className="border-b-2 border-accent pb-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <div className="mt-2">{children}</div>
      </main>
      <footer className="bg-primary-deep py-6 text-center">
        <div className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Dentassiste Unipessoal Lda. · NIF 506 272 338
        </div>
      </footer>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 mt-9 font-display text-xl font-bold text-accent-dark">{children}</h2>;
}
export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[15px] leading-relaxed text-foreground/80">{children}</p>;
}
export function UL({ items }: { items: string[] }) {
  return (
    <ul className="my-3 ml-5 list-disc space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="text-[15px] leading-relaxed text-foreground/80">{it}</li>
      ))}
    </ul>
  );
}
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-r-lg border-l-4 border-accent bg-accent-soft px-4 py-3 text-sm italic text-accent-dark">
      {children}
    </div>
  );
}
export function Updated({ date }: { date: string }) {
  return <p className="mb-8 text-xs text-muted-foreground">{date}</p>;
}
