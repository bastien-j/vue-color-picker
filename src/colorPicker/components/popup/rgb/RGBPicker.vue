<script setup lang="ts">
import { ref, watch } from 'vue';
import RedSlider from './RedSlider.vue';
import GreenSlider from './GreenSlider.vue';
import BlueSlider from './BlueSlider.vue';
import type { RGB } from '@/colorPicker/types';

const props = defineProps<{
  currentColor: RGB
}>()
const emits = defineEmits<{
  (e: 'update', value: typeof props.currentColor): void
}>()

const red = ref(props.currentColor.r)
const green = ref(props.currentColor.g)
const blue = ref(props.currentColor.b)

watch([red, green, blue], (rgb) => {
  emits('update', {r: rgb[0], g: rgb[1], b: rgb[2]})
})
</script>

<template>
  <div class="clr-pckr-hsl">
    <RedSlider v-model="red" :green="green" :blue="blue" />
    <GreenSlider v-model="green" :red="red" :blue="blue" />
    <BlueSlider v-model="blue" :red="red" :green="green" />
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-hsl {
  display: grid;
  gap: 16px;
  padding: 16px;
}
</style>