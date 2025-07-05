/**
 * Korean district/city data types
 * This file is used to generate JSON schema for validation
 */

export interface District {
  /** District or city name in Korean */
  name: string
  /** Province or metropolitan city name */
  city: string
  /** Population count (must be positive) */
  population: number
  /** District type - either 구 (gu) or 시 (si) */
  type: '구' | '시'
}

export type KoreanDistricts = District[]
