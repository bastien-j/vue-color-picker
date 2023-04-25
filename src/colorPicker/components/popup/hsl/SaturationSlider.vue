<script setup lang="ts">
import { computed } from 'vue';
import CustomSlider from '../../sliders/CustomSlider.vue';

const props = defineProps<{
  modelValue: number
  hue: number
  lightness: number
}>()
defineEmits<{
  (e: 'update:model-value', value: typeof props.modelValue): void
}>()

const thumbColor = computed(() => `hsl(${props.hue}, ${props.modelValue}%, ${props.lightness}%)`)
const gradientStart = computed(() => `hsl(${props.hue}, 0%, ${props.lightness}%)`)
const gradientEnd = computed(() => `hsl(${props.hue}, 100%, ${props.lightness}%)`)
const gradient = computed(() => `linear-gradient(to right,${gradientStart.value},${gradientEnd.value})`)
</script>

<template>
  <CustomSlider
    :gradient="gradient"
    :thumb-color="thumbColor"
    :label="'Saturation'"
    :max="100"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  />
</template>

<style scoped lang="scss">

</style>