import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Equipamento", "Dados de contacto", "Confirmação"];

export function ProgressStepper({ step }: { step: number }) {
  return (
    <div className="mb-7">
      <div className="mb-3 flex justify-between gap-2">
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={s} className={cn("flex flex-1 flex-col items-center transition-opacity", i > step && "opacity-40")}>
              <div
                className={cn(
                  "mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-smooth",
                  done && "bg-accent text-accent-foreground",
                  active && "bg-primary text-primary-foreground ring-4 ring-accent/25",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-center text-[10px]", active ? "font-bold text-foreground" : "text-muted-foreground")}>
                {s}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full gradient-accent transition-all duration-500"
          style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
