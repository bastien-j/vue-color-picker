import { computed, isRef, ref, unref, watchEffect } from "vue";
import type { ColorFormat, MaybeRef } from "../types";
import { guessFormat, hslToRgb, parse, rgbToHex } from "../utils/colorParser";
import { hslToString } from "../utils/colorParser";
import { rgbToString } from "../utils/colorParser";

export function useColor(color: MaybeRef<string>) {
  const h = ref(-1)
  const s = ref(-1)
  const l = ref(-1)
  const format = ref<ColorFormat>('hsl')
  const hsl = computed(() => ({ h: h.value, s: s.value, l: l.value }))
  const rgb = computed(() => hslToRgb(hsl.value.h, hsl.value.s, hsl.value.l))
  const hex = computed(() => rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b))
  const clrToStr = computed(() => {
    if (!format.value) return ''
    if (format.value === 'hsl') return hslToString(hsl.value)
    if (format.value === 'rgb') return rgbToString(rgb.value)
    return hex.value
  })
  // let oldColor = ''

  function doParse() {
    const _color = unref(color)
    const _format = guessFormat(_color)
    if (!_format) return

    format.value = _format

    const _hslColor = parse(_color, 'hsl')
    h.value = _hslColor.h
    s.value = _hslColor.s
    l.value = _hslColor.l

    // oldColor = _color
  }

  if (isRef(color)) watchEffect(doParse)
  else doParse()

  return {
    format,
    h, s, l,
    hsl,
    rgb,
    hex,
    clrToStr
  }
}