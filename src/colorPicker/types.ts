import type { Ref } from "vue";
import type ColorPicker from "./ColorPicker.vue";

export type MaybeRef<T> = T | Ref<T>

export * from './index'

declare module 'vue' {
  interface GlobalComponents {
    ColorPicker: typeof ColorPicker
  }
}