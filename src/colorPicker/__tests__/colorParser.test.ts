import { expect, test } from 'vitest'
import { parseHSL, hsvToHsl, hslToHsv } from '../colorParser'

test('parse hsl', () => {
  expect(parseHSL('hsl(100, 54%, 34%)')).toStrictEqual({ h: 100, s: 54, l: 34})
})
test('throw invalid HSL color', () => {
  expect(() => parseHSL('hdsl(100, 54%, 34%)')).toThrowError('Invalid HSL color string')
})
test('hsv to hsl', () => {
  expect(hsvToHsl(220, 51, 75)).toStrictEqual({ h: 220, s: 43, l: 56})
})
test('hsl to hsv', () => {
  expect(hslToHsv(220, 43, 56)).toStrictEqual({ h: 220, s: 51, v: 75})
})