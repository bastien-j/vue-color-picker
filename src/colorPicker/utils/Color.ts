import type { HSL, RGB } from "../types"
import { guessFormat, hslToRgb, parseHSL, parseRGB, parseRGBFromHEX, rgbToHsl } from "./colorParser"

class Color {
  private hsl!: HSL
  private rgb!: RGB

  constructor(color: string) {
    this.parseColor(color)
  }

  public parseColor(color: string) {
    const format = guessFormat(color)
    if (!format) throw new Error('Unknown color format.')
    if (format === 'hsl') {
      this.hsl = parseHSL(color)
      this.rgb = hslToRgb(this.hsl.h, this.hsl.s, this.hsl.l)
    } else if (format === 'rgb') {
      this.rgb = parseRGB(color)
      this.hsl = rgbToHsl(this.rgb.r, this.rgb.g, this.rgb.b)
    } else {
      this.rgb = parseRGBFromHEX(color)
      this.hsl = rgbToHsl(this.rgb.r, this.rgb.g, this.rgb.b)
    }
  }
}

export default Color