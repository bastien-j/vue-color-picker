<script setup lang="ts">
import type { ColorFormat, HSL, RGB } from '../types';
import { toRefs } from 'vue';
import { useColor } from '../composables/color';
import { hslToString, isValidHEX, rgbToString } from '../utils/colorParser';

const props = defineProps<{
  modelValue?: ColorFormat
  currentColor: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: ColorFormat): void
  (e: 'update', value: string): void
}>()

const formats: ColorFormat[] = ['hex', 'hsl', 'rgb']

const { currentColor } = toRefs(props)
const { hsl, rgb, hex } = useColor(currentColor)

function changeFormat(event: Event) {
  const value = (event.target as HTMLSelectElement).value as ColorFormat
  emits('update:modelValue', value)
}

function updateHSL(h?: number, s?: number, l?: number) {
  const _hsl: HSL = {
    h: h ?? hsl.value.h,
    s: s ? s / 100 : hsl.value.s,
    l: l ? l / 100 : hsl.value.l
  }
  emits('update', hslToString(_hsl))
}

function updateRGB(r?: number, g?: number, b?: number) {
  const _rgb: RGB = {
    r: r ?? rgb.value.r,
    g: g ?? rgb.value.g,
    b: b ?? rgb.value.b
  }
  emits('update', rgbToString(_rgb))
}

function updateHEX(hex: string) {
  if (!isValidHEX(hex)) return
  emits('update', hex)
}
</script>

<template>
  <div class="clr-pckr-frmt-slctr">
    <select :value="modelValue" @change="changeFormat($event)">
      <option v-for="format in formats" :key="format">{{ format }}</option>
    </select>
    <div class="clr-pckr-frmt-slctr-inputs">
      <template v-if="!modelValue || modelValue === 'hsl'">
        <input
          :value="hsl.h"
          @input="updateHSL(parseInt(($event.target as HTMLInputElement).value))"
          type="number"
          min="0"
          max="360"
        />
        <input
          :value="Math.round(hsl.s * 100)"
          @input="updateHSL(undefined, parseInt(($event.target as HTMLInputElement).value))"
          type="number"
          min="0"
          max="100"
        />
        <input
          :value="Math.round(hsl.l * 100)"
          @input="updateHSL(undefined, undefined, parseInt(($event.target as HTMLInputElement).value))"
          type="number"
          min="0"
          max="100"
        />
      </template>
      <template v-else-if="modelValue === 'rgb'">
        <input
          :value="rgb.r"
          @input="updateRGB(parseInt(($event.target as HTMLInputElement).value))"
          type="number"
          min="0"
          max="255"
        />
        <input
          :value="rgb.g"
          @input="updateRGB(undefined, parseInt(($event.target as HTMLInputElement).value))"
          type="number"
          min="0"
          max="255"
        />
        <input
          :value="rgb.b"
          @input="updateRGB(undefined, undefined, parseInt(($event.target as HTMLInputElement).value))"
          type="number"
          min="0"
          max="255"
        />
      </template>
      <template v-else>
        <input
          :value="hex"
          type="text"
          @input="updateHEX(($event.target as HTMLInputElement).value)"
          minlength="4"
          maxlength="7"
        />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-frmt-slctr {
  display: flex;
  gap: 8px;

  select,
  input {
    border: 1px solid hsl(0, 0%, 80%);
    padding: 8px;
    font-size: 16px;
  }
  select {
    padding-right: 0px;
    border-radius: 4px;
  }

  .clr-pckr-frmt-slctr-inputs {
    flex: 1;
    display: flex;
    width: 0;

    input {
      min-width: 0;
      flex: 1;

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      &:not(:first-child):not(:last-child) {
        border-inline: none;
      }
    }
  }
}
</style>