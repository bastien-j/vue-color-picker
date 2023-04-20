import type { ColorFormat, ColorOutput, HSL, HSV, RGB } from '../types'

function isHSL(color: string) {
  return color.startsWith('hsl(')
}

// function isHSLA(color: string) {
//   return color.startsWith('hsla(')
// }

export function isValidHSL(color: string) {
  return isHSL(color)// || isHSLA(color)
}

function isRGB(color: string) {
  return color.startsWith('rgb(')
}

// function isRGBA(color: string) {
//   return color.startsWith('rgba(')
// }

export function isValidRGB(color: string) {
  return isRGB(color)// || isRGBA(color)
}

function isHEX(color: string) {
  return color.toLowerCase().match(/^#([0-9a-f]{2}){3}$/) !== null
}

// function isHEXA(color: string) {
//   return color.toLowerCase().match(/^#([0-9a-f]{2}){4}$/) !== null
// }

export function isValidHEX(color: string) {
  return isHEX(color)// || isHEXA(color)
}

export function isValidFormat(color: string) {
  return isValidHSL(color) || isValidRGB(color) || isValidHEX(color)
}

export function guessFormat(color: string): ColorFormat | null {
  if (isValidHSL(color)) return 'hsl'
  if (isValidRGB(color)) return 'rgb'
  if (isValidHEX(color)) return 'hex'
  return null
}

export function parseHSL(color: string): HSL {
  if (!isValidHSL(color)) throw new Error(`Invalid HSL color string: ${color}`)

  color = /*isHSLA(color) ? color.slice(5, -1) :*/ color.slice(4, -1)
  const [h, s, l] = color.replace(/[ %]/g, '').split(',').map(v => parseInt(v))

  return {
    h: Math.round(h),
    s: parseFloat((s / 100).toFixed(2)),
    l: parseFloat((l / 100).toFixed(2))
  }
}

export function parseRGB(color: string): RGB {
  if (!isValidRGB(color)) throw new Error(`Invalid RGB color string: ${color}`)

  color = /*isHSLA(color) ? color.slice(5, -1) :*/ color.slice(4, -1)
  const [r, g, b] = color.replace(/[ ]/g, '').split(',').map(v => parseInt(v))

  return { r, g, b }
}

export function parseRGBFromHEX(color: string): RGB {
  if (!isValidHEX(color)) throw new Error(`Invalid HEX color string: ${color}`)

  color = color.slice(1)
  const matches = color.match(/.{1,2}/g)
  if (!matches) throw new Error(`Invalid HEX color string: ${color}`)
  const [r, g, b] = matches.map(v => parseInt(v, 16))

  return { r, g, b }
}

export function parse<T extends ColorFormat>(color: string, format: T): ColorOutput<T> {
  const guessedFormat = guessFormat(color)
  if (!guessedFormat) throw new Error(`Unknown color format`)
  let hsl: HSL
  if (guessedFormat === 'hsl') hsl = parseHSL(color)
  else if (guessedFormat === 'rgb') {
    const rgb = parseRGB(color)
    if (format === 'rgb') return rgb as ColorOutput<T>
    if (format === 'hex') return rgbToHex(rgb.r, rgb.g, rgb.b) as ColorOutput<T>
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  } else {
    const rgb = parseRGBFromHEX(color)
    if (format === 'rgb') return rgb as ColorOutput<T>
    if (format === 'hex') return rgbToHex(rgb.r, rgb.g, rgb.b) as ColorOutput<T>
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  }
  if (format === 'hsl') return hsl as ColorOutput<T>
  else if (format === 'rgb') return hslToRgb(hsl.h, hsl.s, hsl.l) as ColorOutput<T>
  else {
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
    return rgbToHex(rgb.r, rgb.g, rgb.b) as ColorOutput<T>
  }
}

export function hsvToHsl(h: number, s: number, v: number): HSL {
  const l = v * (1 - s / 2)
  s = !l || l == 1 ? 0 : (v - l) / Math.min(l, 1 - l)

  return {
    h: Math.round(h),
    s: parseFloat(s.toFixed(2)),
    l: parseFloat(l.toFixed(2))
  }
}

export function hslToHsv(h: number, s: number, l: number): HSV {
  const v = l + s * Math.min(l, 1 - l)
  s = v == 0 ? 0 : 2 * (1 - l / v)

  return {
    h: Math.round(h),
    s: parseFloat(s.toFixed(2)),
    v: parseFloat(v.toFixed(2))
  }
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  function fn(n: number) {
    const k = (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)

    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }

  return {
    r: Math.round(fn(0) * 255),
    g: Math.round(fn(8) * 255),
    b: Math.round(fn(4) * 255)
  }
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255
  g /= 255
  b /= 255

  const v = Math.max(r, g, b)
  const c = v - Math.min(r, g, b)
  const l = v - c / 2

  let h = 0
  if (c !== 0) {
    if (v === r) h = 60*(((g - b) / c) % 6)
    else if (v === g) h = 60*(((b - r) / c) + 2)
    else h = 60*(((r - g) / c) + 4)
  }

  let s = 0
  if (l !== 0 && l !== 1) {
    s = (v - l) / Math.min(l, 1 - l)
  }

  return {
    h: Math.round(h),
    s: parseFloat(s.toFixed(2)),
    l: parseFloat(l.toFixed(2))
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export function hslToString({ h, s, l }: HSL, format?: ColorFormat) {
  if (!format || format === 'hsl') return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  else if (format === 'rgb') {
    const { r, g, b } = hslToRgb(h, s, l)
    return `rgb(${r}, ${g}, ${b})`
  } else {
    const { r, g, b } = hslToRgb(h, s, l)
    return rgbToHex(r, g, b)
  }
}

export function rgbToString({ r, g, b }: RGB, format?: ColorFormat) {
  if (!format || format === 'rgb') return `rgb(${r}, ${g}, ${b})`
  else if (format === 'hsl') {
    const { h, s, l } = rgbToHsl(r, g, b)
    return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  } else {
    return rgbToHex(r, g, b)
  }
}
