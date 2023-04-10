function isHSL(color: string) {
  return color.startsWith('hsl(')
}

function isHSLA(color: string) {
  return color.startsWith('hsla(')
}

export function isValidHSL(color: string) {
  return isHSL(color) || isHSLA(color)
}

export function parseHSL(color: string) {
  if (!isValidHSL(color)) throw new Error(`Invalid HSL color string: ${color}`)

  color = isHSLA(color) ? color.slice(5, -1) : color.slice(4, -1)
  const [h, s, l] = color.replace(/[ %]/g, '').split(',').map(v => parseInt(v))

  return { h, s, l }
}

export function parseHSVFromHSL(color: string) {
  if (!isValidHSL(color)) throw new Error(`Invalid HSL color string: ${color}`)

  const hsl = parseHSL(color)

  return hslToHsv(hsl.h, hsl.s, hsl.l)
}

export function hsvToHsl(h: number, s: number, v: number) {
  s /= 100
  v /= 100

  const l = v * (1 - s / 2)

  s = !l || l == 1 ? 0 : (v - l) / Math.min(l, 1 - l)

  return { h, s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hslToHsv(h: number, s: number, l: number) {
  s /= 100
  l /= 100

  const v = l + s * Math.min(l, 1 - l)
  s = v == 0 ? 0 : 2 * (1 - l / v)

  return { h, s: Math.round(s * 100), v: Math.round(v * 100) }
}