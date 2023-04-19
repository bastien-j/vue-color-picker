import { expect, test } from 'vitest'
import { parseHSL, guessFormat, hsvToHsl, hslToHsv, hslToRgb, rgbToHex, rgbToHsl } from '../utils/colorParser'

test('parse hsl', () => {
  expect(parseHSL('hsl(100, 54%, 34%)')).toStrictEqual({ h: 100, s: 0.54, l: 0.34 })
})
test('throw invalid HSL color', () => {
  expect(() => parseHSL('hdsl(100, 54%, 34%)')).toThrowError('Invalid HSL color string')
})
test('hsv to hsl', () => {
  expect(hsvToHsl(220, 0.51, 0.75)).toStrictEqual({ h: 220, s: 0.43, l: 0.56 })
})
test('hsl to hsv', () => {
  expect(hslToHsv(220, 0.43, 0.56)).toStrictEqual({ h: 220, s: 0.51, v: 0.75 })
})
test('hsl to rgb', () => {
  expect(hslToRgb(220, 0.43, 0.56)).toStrictEqual({ r: 95, g: 127, b: 191 })
})
test('rgb to hex', () => {
  expect(rgbToHex(95, 127, 191)).toStrictEqual('#5f7fbf')
})
test('guess hsl', () => {
  expect(guessFormat('hsl(100, 54%, 34%)')).toStrictEqual('hsl')
})
test('guess invalid hsl', () => {
  expect(guessFormat('hslx(100, 54%, 34%)')).toBeNull()
})
test('guess rgb', () => {
  expect(guessFormat('rgb(95, 127, 191)')).toStrictEqual('rgb')
})
test('guess invalid rgb', () => {
  expect(guessFormat('rgbx(95, 127, 191)')).toBeNull()
})
test('guess hex', () => {
  expect(guessFormat('#5f7fbf')).toStrictEqual('hex')
})
test('guess invalid hex', () => {
  expect(guessFormat('#5g7fbf')).toBeNull()
})
test('rgb to hsl', () => {
  expect(rgbToHsl(95, 127, 191)).toStrictEqual({ h: 220, s: 0.43, l: 0.56 })
})