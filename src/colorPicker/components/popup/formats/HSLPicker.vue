<script setup lang="ts">
import { ref } from 'vue';
import HueSlider from '../hsl/HueSlider.vue';
import SaturationSlider from '../hsl/SaturationSlider.vue';
import LightnessSlider from '../hsl/LightnessSlider.vue';

const hue = ref(0)
const saturation = ref(0)
const lightness = ref(0)
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