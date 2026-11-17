/** Mistura uma cor hex com branco (amount > 0) ou preto (amount < 0). */
export function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16)
  const target = amount > 0 ? 255 : 0
  const a = Math.abs(amount)
  const ch = (v: number) => Math.round(v + (target - v) * a)
  const r = ch((n >> 16) & 255)
  const g = ch((n >> 8) & 255)
  const b = ch(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}
