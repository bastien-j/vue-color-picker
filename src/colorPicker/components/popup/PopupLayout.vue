<script setup lang="ts">
import { ref } from 'vue';
import PopupButton from '../buttons/PopupButton.vue';
import FormatSelector from './FormatSelector.vue';
import HSLPicker from './hsl/HSLPicker.vue';
import RGBPicker from './rgb/RGBPicker.vue';
import type { HSL, RGB } from '@/colorPicker/types';
import { useColor } from '@/colorPicker/composables/color';
import { hslToString, rgbToString } from '@/colorPicker/utils/colorParser';

const props = defineProps<{
  color: string
}>()
const emits = defineEmits<{
  (e: 'close', value: string): void
  (e: 'open'): void
}>()

const show = ref(false)
const currentColor = ref(props.color)
const { format, hsl, rgb } = useColor(currentColor)

function updateFromHSL(color: HSL) {
  currentColor.value = hslToString(color)
}
function updateFromRGB(color: RGB) {
  currentColor.value = rgbToString(color)
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
    </div>
    <div class="clr-pckr-footer">
      <FormatSelector v-model="format" />
      <PopupButton icon="content_copy" />
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