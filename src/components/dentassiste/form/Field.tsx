import { useState } from "react";
import { cn } from "@/lib/utils";

export function Lbl({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-foreground">
      {children}
      {optional && <span className="ml-1 font-normal normal-case tracking-normal text-muted-foreground">(opcional)</span>}
    </label>
  );
}

export function Field({
  label, value, onChange, placeholder, optional, type = "text", half,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  optional?: boolean;
  type?: string;
  half?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={cn(half ? "min-w-[45%] flex-1" : "w-full")}>
      {label && <Lbl optional={optional}>{label}</Lbl>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full rounded-md border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition-colors",
          focused ? "border-accent ring-2 ring-accent/20" : "border-border",
        )}
      />
    </div>
  );
}

export function Chips({
  options, selected, onToggle, multi = false,
}: {
  options: string[];
  selected: string | string[];
  onToggle: (v: string) => void;
  multi?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = multi ? (selected as string[]).includes(opt) : selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-smooth",
              on
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
