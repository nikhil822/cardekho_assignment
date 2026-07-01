// Formats a rupee amount as lakhs, e.g. 1250000 -> "₹12.50 L"
export function formatLakhs(amount: number): string {
  const lakhs = amount / 100000;
  return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)} L`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatLakhs(min);
  return `${formatLakhs(min)} – ${formatLakhs(max)}`;
}

export function formatMileage(value: number): string {
  return `${value?.toFixed(1)} kmpl`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
  