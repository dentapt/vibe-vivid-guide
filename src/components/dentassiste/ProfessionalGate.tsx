import { useState } from "react";
import { ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfessionalGateProps {
  onConfirm: () => void;
}

export function ProfessionalGate({ onConfirm }: ProfessionalGateProps) {
  const [closing, setClosing] = useState(false);
  const handle = () => {
    setClosing(true);
    setTimeout(onConfirm, 200);
  };
  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-primary-deep/95 p-6 backdrop-blur-md transition-opacity duration-200 ${closing ? "opacity-0" : "animate-fade-in"}`}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-elevated">
        <div className="gradient-hero relative border-b-2 border-accent/60 px-8 py-7">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-radial-glow)" }} />
          <div className="relative">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
              <Stethoscope className="h-3.5 w-3.5" />
              Dentassiste
            </div>
            <h2 className="font-display text-2xl font-bold leading-tight text-primary-foreground">
              Área reservada a profissionais de saúde
            </h2>
          </div>
        </div>
        <div className="space-y-5 p-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            O conteúdo deste site destina-se exclusivamente a{" "}
            <strong className="text-foreground">profissionais do setor da medicina dentária</strong> — clínicas, médicos
            dentistas e técnicos de saúde oral.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ao entrar, confirma que pertence a este público profissional e que compreende o contexto técnico dos
            serviços apresentados.
          </p>
          <Button onClick={handle} variant="hero" size="lg" className="w-full">
            <ShieldCheck className="h-4 w-4" />
            Confirmo — sou profissional de saúde
          </Button>
          <p className="text-center text-xs leading-relaxed text-muted-foreground/70">
            Se não pertencer ao público profissional, agradecemos que não prossiga.
          </p>
        </div>
      </div>
    </div>
  );
}
