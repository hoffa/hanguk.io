import { describe, it, expect } from 'vitest'
import { roundToFirstDigit, formatKoreanNumber } from './utils'

describe('roundToFirstDigit', () => {
  it('rounds to first significant digit', () => {
    expect(roundToFirstDigit(561052)).toBe(600000)
    expect(roundToFirstDigit(440359)).toBe(400000)
    expect(roundToFirstDigit(298903)).toBe(300000)
    expect(roundToFirstDigit(1072973)).toBe(1000000)
    expect(roundToFirstDigit(948757)).toBe(900000)
  })

  it('handles smaller numbers', () => {
    expect(roundToFirstDigit(67)).toBe(70)
    expect(roundToFirstDigit(7)).toBe(7)
    expect(roundToFirstDigit(58)).toBe(60)
    expect(roundToFirstDigit(123)).toBe(100)
    expect(roundToFirstDigit(1234)).toBe(1000)
  })

  it('handles edge cases', () => {
    expect(roundToFirstDigit(0)).toBe(0)
    expect(roundToFirstDigit(1)).toBe(1)
    expect(roundToFirstDigit(10)).toBe(10)
    expect(roundToFirstDigit(100)).toBe(100)
  })

  it('handles negative numbers', () => {
    expect(roundToFirstDigit(-561052)).toBe(-600000)
    expect(roundToFirstDigit(-67)).toBe(-70)
  })
})

describe('formatKoreanNumber', () => {
  it('formats numbers in 만 (10,000s)', () => {
    expect(formatKoreanNumber(600000)).toBe('60만')
    expect(formatKoreanNumber(400000)).toBe('40만')
    expect(formatKoreanNumber(1000000)).toBe('100만')
    expect(formatKoreanNumber(90000)).toBe('9만')
  })

  it('formats very large numbers correctly', () => {
    expect(formatKoreanNumber(10000000)).toBe('천만') // 10 million should be 천만, not 1000만
    expect(formatKoreanNumber(20000000)).toBe('2천만') // 20 million should be 2천만
    expect(formatKoreanNumber(50000000)).toBe('5천만') // 50 million should be 5천만
  })

  it('handles Seoul population correctly', () => {
    // Seoul: 9,586,195 → rounded to 10,000,000 → formatted as 천만
    expect(formatKoreanNumber(roundToFirstDigit(9586195))).toBe('천만')
  })

  it('formats numbers in 천 (1,000s)', () => {
    expect(formatKoreanNumber(5000)).toBe('5천')
    expect(formatKoreanNumber(9000)).toBe('9천')
    expect(formatKoreanNumber(1000)).toBe('1천')
  })

  it('formats numbers in 백 (100s)', () => {
    expect(formatKoreanNumber(300)).toBe('3백')
    expect(formatKoreanNumber(700)).toBe('7백')
    expect(formatKoreanNumber(100)).toBe('1백')
  })

  it('formats mixed units', () => {
    expect(formatKoreanNumber(125000)).toBe('12만 5천')
    expect(formatKoreanNumber(130000)).toBe('13만')
    expect(formatKoreanNumber(12500)).toBe('1만 2천')
    expect(formatKoreanNumber(10300)).toBe('1만 3백')
  })

  it('handles small numbers', () => {
    expect(formatKoreanNumber(50)).toBe('50')
    expect(formatKoreanNumber(7)).toBe('7')
    expect(formatKoreanNumber(99)).toBe('99')
  })

  it('handles edge cases', () => {
    expect(formatKoreanNumber(0)).toBe('0')
    expect(formatKoreanNumber(1)).toBe('1')
    expect(formatKoreanNumber(10)).toBe('10')
  })
})
