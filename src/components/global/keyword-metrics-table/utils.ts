export function formatNumber(
  num: number | string | undefined,
  minDecimals = 0,
): string {
  return num === undefined || num === null
    ? '-'
    : Number.parseFloat(num.toString()).toLocaleString('en-US', {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: 2,
    });
}

export function formatDollarAmount(amount: number | string | undefined): string {
  return formatNumber(amount, 2);
}
