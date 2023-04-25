<script setup lang="ts">
import { computed } from 'vue';
import CustomSlider from '../../sliders/CustomSlider.vue';

const props = defineProps<{
  modelValue: number
  hue: number
  saturation: number
}>()
defineEmits<{
  (e: 'update:model-value', value: typeof props.modelValue): void
}>()

const thumbColor = computed(() => `hsl(${props.hue}, ${props.saturation}%, ${props.modelValue}%)`)
const gradientStart = computed(() => `hsl(${props.hue}, ${props.saturation}%, 0%)`)
const gradientMiddle = computed(() => `hsl(${props.hue}, ${props.saturation}%, 50%)`)
const gradientEnd = computed(() => `hsl(${props.hue}, ${props.saturation}%, 100%)`)
const gradient = computed(() => `linear-gradient(to right,${gradientStart.value},${gradientMiddle.value},${gradientEnd.value})`)
</script>

<template>
  <CustomSlider
    :gradient="gradient"
    :thumb-color="thumbColor"
    :label="'Lightness'"
    :max="100"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  />
</template>

<style scoped lang="scss">

</style>