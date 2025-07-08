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
 * 10000000 → "천만"
 * 5000 → "5천"
 * 300 → "3백"
 */
export function formatKoreanNumber(num: number): string {
  if (num === 0) return '0'

  // Handle very large numbers (천만 and above)
  if (num >= 10000000) {
    const cheonMan = Math.floor(num / 10000000)
    const remainder = num % 10000000

    if (remainder === 0) {
      return cheonMan === 1 ? '천만' : `${cheonMan}천만`
    } else {
      // For now, just show the main unit for very large numbers
      return cheonMan === 1 ? '천만' : `${cheonMan}천만`
    }
  } else if (num >= 10000) {
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

/**
 * Extract a human-friendly domain from a URL
 * Examples:
 * "https://google.com/foobar?123" → "google.com"
 * "http://www.example.com/path" → "example.com"
 * "https://ko.wikipedia.org/wiki/Seoul" → "ko.wikipedia.org"
 * "example.com" → "example.com"
 */
export function getHumanFriendlyDomain(url: string): string {
  try {
    // If it doesn't start with protocol, add https://
    const normalizedUrl =
      url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`

    const urlObj = new URL(normalizedUrl)
    let hostname = urlObj.hostname

    // Remove www. prefix if present
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4)
    }

    return hostname
  } catch {
    // If URL parsing fails, return the original string
    return url
  }
}

/**
 * Calculate the squared Euclidean distance between two points
 * Much faster than Haversine for comparison purposes
 * Returns squared distance (no need for sqrt since we only compare)
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dx = lat2 - lat1
  const dy = lon2 - lon1
  return dx * dx + dy * dy
}

/**
 * Sort divisions by distance from a target division
 * Divisions without coordinates are placed at the end
 */
export function sortByDistance<T extends { lat?: number; lon?: number }>(
  divisions: T[],
  targetDivision: T
): T[] {
  if (!targetDivision.lat || !targetDivision.lon) {
    // If target has no coordinates, return original order
    return divisions
  }

  const withDistance = divisions.map(division => ({
    division,
    distance:
      division.lat && division.lon
        ? calculateDistance(targetDivision.lat!, targetDivision.lon!, division.lat, division.lon)
        : Infinity,
  }))

  return withDistance.sort((a, b) => a.distance - b.distance).map(item => item.division)
}
