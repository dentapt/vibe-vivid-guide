import { createLucideIcon } from "lucide-react";

/**
 * Ícones próprios dos instrumentos, desenhados na grelha 24×24 e no mesmo traço dos ícones lucide,
 * para se poderem usar em qualquer sítio onde se usa um ícone lucide (mesmas props: className, strokeWidth…).
 */

export const TurbinaIcon = createLucideIcon("Turbina", [
  ["rect", { x: "2", y: "7", width: "6", height: "4.5", rx: "1.5", key: "head" }],
  ["path", { d: "M5 11.5V16", key: "bur" }],
  ["path", { d: "M8 7.8 21 5", key: "top" }],
  ["path", { d: "M8 10.8 21 9", key: "bottom" }],
  ["path", { d: "M21 5a2 2 0 0 1 0 4", key: "end" }],
  ["path", { d: "M16 6.1v3.6", key: "ring" }],
]);

export const ContraAnguloIcon = createLucideIcon("ContraAngulo", [
  ["rect", { x: "2", y: "9", width: "4.5", height: "3.6", rx: "1.2", key: "head" }],
  ["path", { d: "M4.25 12.6v3.9", key: "bur" }],
  ["path", { d: "M6.5 10H10l2-1.6 9-4", key: "top" }],
  ["path", { d: "M6.5 11.6H10l2 .4 9-3.6", key: "bottom" }],
  ["path", { d: "M21 4.4a2 2 0 0 1 0 4", key: "end" }],
  ["path", { d: "M12 8.4V12", key: "ring" }],
]);

export const MicromotorIcon = createLucideIcon("Micromotor", [
  ["rect", { x: "4.5", y: "7.5", width: "11", height: "7", rx: "2", key: "body" }],
  ["rect", { x: "1.5", y: "9.5", width: "3", height: "3", rx: "0.8", key: "coupling" }],
  ["path", { d: "M8.5 7.5v7", key: "ring" }],
  ["path", { d: "M15.5 11h2a3 3 0 0 1 3 3v5", key: "cable" }],
]);

export const PecaMaoRetaIcon = createLucideIcon("PecaMaoReta", [
  ["path", { d: "M5.5 9.8 19 8.5", key: "top" }],
  ["path", { d: "M5.5 13.2 19 14.5", key: "bottom" }],
  ["path", { d: "M5.5 9.8 3.5 10.8v1.4l2 1", key: "nose" }],
  ["path", { d: "M3.5 11.5H1", key: "bur" }],
  ["path", { d: "M19 8.5h1.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H19", key: "end" }],
  ["path", { d: "M9.5 9.4v4.2", key: "ring1" }],
  ["path", { d: "M12 9.2v4.6", key: "ring2" }],
]);
