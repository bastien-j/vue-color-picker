<script setup lang="ts">
import { ref, watch } from 'vue';
import HueSlider from './HueSlider.vue';
import SaturationSlider from './SaturationSlider.vue';
import LightnessSlider from './LightnessSlider.vue';
import type { HSL } from '@/colorPicker/types';

const props = defineProps<{
  currentColor: HSL
}>()
const emits = defineEmits<{
  (e: 'update', value: typeof props.currentColor): void
}>()

const hue = ref(props.currentColor.h)
const saturation = ref(props.currentColor.s * 100)
const lightness = ref(props.currentColor.l * 100)

watch([hue, saturation, lightness], (hsl) => {
  emits('update', {h: hsl[0], s: hsl[1] / 100, l: hsl[2] / 100})
})
</script>

<template>
  <div class="clr-pckr-hsl">
    <HueSlider v-model="hue" />
    <SaturationSlider v-model="saturation" :hue="hue" :lightness="lightness" />
    <LightnessSlider v-model="lightness" :hue="hue" :saturation="saturation" />
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-hsl {
  display: grid;
  gap: 16px;
  padding: 16px;
}
</style>