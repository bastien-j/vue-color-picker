import type { Ref } from 'vue'
import type ColorPicker from './ColorPicker.vue'

export type MaybeRef<T> = T | Ref<T>

export type ColorFormat = 'hsl' | 'rgb' | 'hex'
export type HSV = { h: number; s: number; v: number }
export type HSL = { h: number; s: number; l: number }
export type RGB = { r: number; g: number; b: number }

export type ColorOutput<T extends ColorFormat> = T extends 'hsl' ? HSL : T extends 'rgb' ? RGB : string

export * from './index'

declare module 'vue' {
  interface GlobalComponents {
    ColorPicker: typeof ColorPicker
  }
}
