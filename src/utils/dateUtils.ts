/**
 * Utilitários de data em fuso local (evitam deslocamento por UTC em YYYY-MM-DD).
 */

/** Parsea string YYYY-MM-DD em partes no fuso local (month 0-based para new Date). */
export function parseLocalDate(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split("-").map(Number);
  return { year, month: month - 1, day };
}

/** Retorna o início do dia (00:00:00.000) para uma string YYYY-MM-DD no fuso local. */
export function toLocalDateStart(dateStr: string): Date {
  const { year, month, day } = parseLocalDate(dateStr);
  return new Date(year, month, day, 0, 0, 0, 0);
}

/** Retorna o fim do dia (23:59:59.999) para uma string YYYY-MM-DD no fuso local. */
export function toLocalDateEnd(dateStr: string): Date {
  const { year, month, day } = parseLocalDate(dateStr);
  return new Date(year, month, day, 23, 59, 59, 999);
}

/** Formata Date em YYYY-MM-DD no fuso local (sem usar UTC). */
export function formatDateLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
