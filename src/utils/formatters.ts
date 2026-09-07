/**
 * Formatting helpers for numbers, matrices, and coordinates
 */

export function formatDecimal(value: number | null | undefined, places: number = 6): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "—";
  }
  return value.toFixed(places);
}

export function formatHomographyMatrix(matrix: number[][] | null): string[][] | null {
  if (!matrix || !Array.isArray(matrix)) return null;
  return matrix.map((row) =>
    Array.isArray(row)
      ? row.map((val) => formatDecimal(val, 6))
      : ["—", "—", "—"]
  );
}

export function formatPercent(value: number, places: number = 1): string {
  if (isNaN(value)) return "—";
  return `${value.toFixed(places)}%`;
}
