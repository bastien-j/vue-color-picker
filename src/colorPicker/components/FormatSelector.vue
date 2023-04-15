<script setup lang="ts">
import { computed } from 'vue';
import type { ColorFormat } from '../types';
import { hslToRgb, parse, rgbToHex } from '../colorParser'
import { watch } from 'vue';

const props = defineProps<{
  modelValue?: ColorFormat
  currentColor: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: ColorFormat): void
  (e: 'update:format', value: string): void
}>()

const formats: ColorFormat[] = ['hex', 'hsl', 'rgb']

const hsl = computed(() => parse(props.currentColor, 'hsl'))
const rgb = computed(() => hslToRgb(hsl.value.h, hsl.value.s, hsl.value.l))
const hex = computed(() => rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b))

function changeFormat(event: Event) {
  const value = (event.target as HTMLSelectElement).value as ColorFormat
  emits('update:modelValue', value)
  emitColor(value)
}

function emitColor(value: ColorFormat) {
  if (value === 'hsl') return emitHSL()
  if (value === 'rgb') return emitRGB()
  if (value === 'hex') return emitHEX()
}
function emitHSL() {
  emits('update:format', `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`)
}
function emitRGB() {
  emits('update:format', `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`)
}
function emitHEX() {
  emits('update:format', hex.value)
}

watch(() => props.currentColor, () => {
  if (props.modelValue) emitColor(props.modelValue)
})
</script>

<template>
  <div class="clr-pckr-frmt-slctr">
    <select :value="modelValue" @change="changeFormat($event)">
      <option v-for="format in formats" :key="format">{{ format }}</option>
    </select>
    <div class="clr-pckr-frmt-slctr-inputs">
      <template v-if="!modelValue || modelValue === 'hsl'">
        <input :value="hsl.h" type="number" readonly />
        <input :value="hsl.s" type="number" readonly />
        <input :value="hsl.l" type="number" readonly />
      </template>
      <template v-else-if="modelValue === 'rgb'">
        <input :value="rgb.r" type="number" readonly />
        <input :value="rgb.g" type="number" readonly />
        <input :value="rgb.b" type="number" readonly />
      </template>
      <template v-else>
        <input :value="hex" type="text" readonly />
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