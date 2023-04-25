<script setup lang="ts">
import { computed } from 'vue';
import type { HSL } from '../types';

const props = defineProps<{
  modelValue?: number
}>()
defineEmits<{
  (e: 'update:model-value', value?: HSL): void
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gradientColor = computed(() => `hsl(${props.modelValue}, 100%, 50%)`)

// function emitHue(hue: string) {
//   if (!props.value) return
//   emits('update', {
//     ...props.value,
//     h: parseInt(hue)
//   })
// }
</script>

<template>
  <div class="clr-pckr-hue-slider">
    <input
      class="clr-pckr-hue-slider"
      type="range"
      min="0"
      max="360"
      :value="modelValue"
      @input="$emit('update:model-value', parseInt(($event.target as HTMLInputElement).value))"
    />
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-hue-slider > input[type="range"] {
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background-image: linear-gradient(to right,red 0,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red 100%);

  &::-webkit-slider-thumb {
    appearance: none;
    background-color: v-bind(gradientColor);
    border-radius: 999px;
    width: 20px;
    height: 20px;
    border: 3px solid white;
    cursor: pointer;
    box-shadow: 0 0 5px hsl(0, 0%, 50%);
  }
}
</style>