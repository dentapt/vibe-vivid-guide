import {
  Settings2, Cog, Wrench, Stethoscope, SprayCan, Truck, FileText, Search, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Instrument = {
  id: number;
  type: "" | "turbina" | "contra-angulo" | "micromotor" | "peca-mao-reta";
  brand: string;
  serviceId: string;
  model: string;
  serial: string;
  problems: string[];
  problemOther: string;
};

export const EQUIPMENT_TYPES: { id: Instrument["type"]; label: string; icon: LucideIcon; highlight?: boolean }[] = [
  { id: "turbina", label: "Turbina", icon: Settings2, highlight: true },
  { id: "contra-angulo", label: "Contra-Ângulo", icon: Cog },
  { id: "micromotor", label: "Micromotor", icon: Wrench },
  { id: "peca-mao-reta", label: "Peça de Mão Reta", icon: Stethoscope },
];

export const TURBINE_BRANDS = [
  { id: "kavo", label: "KaVo" },
  { id: "nsk", label: "NSK" },
  { id: "wh", label: "W&H" },
  { id: "bienair", label: "Bien-Air" },
  { id: "sirona", label: "Sirona" },
  { id: "mkdent", label: "MK-dent" },
  { id: "soco", label: "Soco", lowCost: true },
  { id: "coxo", label: "Coxo", lowCost: true },
];

export const OTHER_BRANDS = ["KaVo", "NSK", "W&H", "Bien-Air", "Sirona", "MK-dent", "Soco", "Coxo"];

export type ServiceDef = {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  note?: string | null;
  getPrice?: (n?: number) => number | null;
  priceLabel?: (n?: number) => string | null;
  includesPickup?: boolean;
};

export const TURBINE_SERVICES: ServiceDef[] = [
  { id: "reparacao", label: "Reparação", desc: "Substituição de rotor e verificação funcional completa", icon: Settings2, note: "Garantia de 12 meses · Verificação antes da entrega", includesPickup: true },
  { id: "limpeza-broca", label: "Limpeza / Broca presa", desc: "Limpeza geral ou remoção de broca encravada", icon: SprayCan, getPrice: () => 45, priceLabel: () => "45€" },
];

export const CA_SERVICES: ServiceDef[] = [
  { id: "limpeza-broca", label: "Limpeza / Broca presa", desc: "Limpeza geral ou remoção de broca encravada", icon: SprayCan, getPrice: () => 45, priceLabel: () => "45€" },
  { id: "reparacao", label: "Reparação / Avaria", desc: "Valor apurado após diagnóstico técnico", icon: Wrench, getPrice: () => null, priceLabel: () => null },
];

export const TURBINE_SYMPTOMS = ["Não segura a broca", "Sem rotação", "Rotação lenta", "Vibração excessiva", "Ruído anormal", "Outro"];
export const CA_SYMPTOMS = ["Sem rotação", "Rotação irregular", "Ruído anormal", "Vibração", "Peça solta", "Aquecimento", "Outro"];
export const MM_SYMPTOMS = ["Sem funcionamento", "Perda de potência", "Aquecimento", "Ruído", "Problemas elétricos", "Outro"];
export const PM_SYMPTOMS = ["Sem rotação", "Rotação irregular", "Ruído anormal", "Vibração", "Aquecimento", "Peça solta", "Outro"];

export const SERVICES_LIST: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Settings2, title: "Reparação de Turbinas", desc: "Substituição de rotor com componentes compatíveis de qualidade. Garantia de 12 meses incluída." },
  { icon: Cog, title: "Contra-Ângulos", desc: "Limpeza, verificação e reparação. Avarias diagnosticadas antes de qualquer intervenção." },
  { icon: Wrench, title: "Micromotores", desc: "Diagnóstico técnico e reparação. Orçamento apresentado antes de iniciar os trabalhos." },
  { icon: Truck, title: "Recolha e entrega incluídas", desc: "Nas reparações de turbinas, a recolha na clínica e a entrega após reparação estão incluídas no preço." },
  { icon: FileText, title: "Relatório técnico", desc: "Cada equipamento é devolvido com relatório descritivo da intervenção realizada." },
  { icon: Search, title: "Orçamento antes da intervenção", desc: "Nunca iniciamos uma reparação sem informar o valor. Sem surpresas na fatura." },
  { icon: Stethoscope, title: "Peças de Mão Retas", desc: "Diagnóstico e reparação de peças de mão retas. Orçamento apresentado antes de qualquer intervenção." },
];

export const BRANDS_LOGOS = ["KaVo", "NSK", "W&H", "Bien-Air", "Sirona", "MK-dent"];

export function getInstPrice(inst: Instrument, nTurbines: number): number | null {
  if (inst.type === "turbina") {
    const svc = TURBINE_SERVICES.find((s) => s.id === inst.serviceId);
    if (svc) {
      if (svc.id === "reparacao") {
        const brand = TURBINE_BRANDS.find((b) => b.id === inst.brand);
        const base = brand?.lowCost ? 100 : 160;
        return nTurbines >= 2 ? base - 10 : base;
      }
      return svc.getPrice ? svc.getPrice(nTurbines) : null;
    }
  }
  if (inst.type === "contra-angulo") {
    const svc = CA_SERVICES.find((s) => s.id === inst.serviceId);
    if (svc && svc.getPrice) return svc.getPrice();
  }
  return null;
}

export function calcTotal(instruments: Instrument[]) {
  const nT = instruments.filter((i) => i.type === "turbina").length;
  let total = 0, hasKnown = false, hasUnknown = false;
  instruments.forEach((inst) => {
    const p = getInstPrice(inst, nT);
    if (typeof p === "number") { total += p; hasKnown = true; }
    else if (inst.type) hasUnknown = true;
  });
  return { total, hasKnown, hasUnknown };
}

export function newInstrument(): Instrument {
  return { id: Date.now() + Math.random(), type: "", brand: "", serviceId: "", model: "", serial: "", problems: [], problemOther: "" };
}

export const HERO_BADGES = [
  { icon: ShieldCheck, label: "Garantia 12 meses" },
  { icon: Truck, label: "Recolha incluída" },
  { icon: Search, label: "Orçamento antes da intervenção" },
];
