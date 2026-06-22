export function formatSalary(salary?: string | null): string {
  if (!salary || salary.trim() === "") return "Not specified";

  const lower = salary.toLowerCase();

  if (lower.includes("not specified")) return "Not specified";

  const isHourly = lower.includes("hour");

  const cleaned = salary
    .replace(/–|—/g, "-")
    .replace(/\(.*?\)/g, "")
    .replace(/per year|per hour|\/year|\/hour/gi, "")
    .trim();

  return isHourly ? `${cleaned} / hr` : cleaned;
}