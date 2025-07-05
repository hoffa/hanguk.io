/**
 * Round a number to its first significant digit
 * Examples:
 * 561052 → 600000
 * 67 → 70
 * 7 → 7
 * 1234 → 1000
 */
export function roundToFirstDigit(num: number): number {
  if (num === 0) return 0

  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(num))))
  return Math.round(num / magnitude) * magnitude
}

/**
 * Format a number in Korean units (만, 천, 백)
 * Examples:
 * 600000 → "60만"
 * 90000 → "9만"
 * 5000 → "5천"
 * 300 → "3백"
 */
export function formatKoreanNumber(num: number): string {
  if (num === 0) return '0'

  if (num >= 10000) {
    const man = Math.floor(num / 10000)
    const remainder = num % 10000

    if (remainder === 0) {
      return `${man}만`
    } else if (remainder >= 1000) {
      const cheon = Math.floor(remainder / 1000)
      return `${man}만 ${cheon}천`
    } else if (remainder >= 100) {
      const baek = Math.floor(remainder / 100)
      return `${man}만 ${baek}백`
    } else {
      return `${man}만`
    }
  } else if (num >= 1000) {
    return `${Math.floor(num / 1000)}천`
  } else if (num >= 100) {
    return `${Math.floor(num / 100)}백`
  } else {
    return num.toString()
  }
}
