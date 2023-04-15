import type { Ref } from 'vue'
import type ColorPicker from './ColorPicker.vue'

export type MaybeRef<T> = T | Ref<T>

export type ColorFormat = 'hsl' | 'rgb' | 'hex'
export type HSV = { h: number; s: number; v: number }

export * from './index'

declare module 'vue' {
  interface GlobalComponents {
    ColorPicker: typeof ColorPicker
  }
}
