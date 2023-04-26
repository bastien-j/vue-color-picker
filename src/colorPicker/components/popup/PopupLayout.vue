<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PopupButton from '../buttons/PopupButton.vue';
import FormatSelector from './FormatSelector.vue';
import HSLPicker from './hsl/HSLPicker.vue';
import RGBPicker from './rgb/RGBPicker.vue';
import type { ColorFormat, HSL, RGB } from '@/colorPicker/types';
import { useColor } from '@/colorPicker/composables/color';
import { guessFormat, hslToString, rgbToHex, rgbToString } from '@/colorPicker/utils/colorParser';
import AreaPicker from './picker/AreaPicker.vue';

const props = defineProps<{
  color: string
}>()
const emits = defineEmits<{
  (e: 'close', value: string): void
  (e: 'update', value: string): void
  (e: 'open'): void
}>()

const show = ref(false)
const copySuccess = ref(false)
const currentColor = ref(props.color)
const format = ref<ColorFormat>('hsl')
const { hsl, rgb } = useColor(currentColor)

function updateFromHSL(color: HSL) {
  updateColor(hslToString(color))
}
function updateFromRGB(color: RGB) {
  updateColor(rgbToString(color))
}
function updateFormat(fmt: ColorFormat) {
  format.value = fmt
  if (format.value === 'hsl') updateColor(hslToString(hsl.value))
  else if (format.value=== 'rgb') updateColor(rgbToString(rgb.value))
  else updateColor(rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b))
}

function updateColor(color: string) {
  currentColor.value = color
  emits('update', currentColor.value)
}

function open() {
  show.value = true
  emits('open')
}
function close() {
  show.value = false
  emits('close', currentColor.value)
}
function toggle() {
  if (show.value) close()
  else open()
}

async function copyColor() {
  if (copySuccess.value) return
  await navigator.clipboard.writeText(currentColor.value)
  copySuccess.value = true
  setTimeout(() => {
    copySuccess.value = false
  }, 1000);
}

onMounted(() => {
  format.value = guessFormat(props.color) ?? 'hsl'
})

defineExpose({
  open,
  close,
  toggle
})
</script>

<template>
  <div class="clr-pckr-popup" :class="{show}">
    <div class="clr-pckr-body">
      <HSLPicker v-if="format === 'hsl'" :current-color="hsl" @update="updateFromHSL" />
      <RGBPicker v-else-if="format === 'rgb'" :current-color="rgb" @update="updateFromRGB" />
      <AreaPicker v-else-if="format === 'hex'" :current-color="hsl" @update="updateColor" />
    </div>
    <div class="clr-pckr-footer">
      <FormatSelector :format="format" @update="updateFormat" />
      <PopupButton :icon="copySuccess ? 'check' : 'content_copy'" @click="copyColor" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-popup {
  background: hsl(0, 100%, 100%);
  border-radius: 16px;
  box-shadow: hsl(0, 0%, 90%) 0 0 10px;
  min-width: 300px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  .clr-pckr-footer {
    box-shadow: hsl(0, 0%, 90%) 0 -1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }
}
</style>