<script setup lang="ts">
import { computed } from 'vue';
import CustomSlider from '../../sliders/CustomSlider.vue';

const props = defineProps<{
  modelValue: number
  green: number
  blue: number
}>()
defineEmits<{
  (e: 'update:model-value', value?: typeof props.modelValue): void
}>()

const thumbColor = computed(() => `rgb(${props.modelValue}, ${props.green}, ${props.blue})`)
const gradientStart = computed(() => `rgb(0, ${props.green}, ${props.blue})`)
const gradientEnd = computed(() => `rgb(255, ${props.green}, ${props.blue})`)
const gradient = computed(() => `linear-gradient(to right,${gradientStart.value},${gradientEnd.value})`)
</script>

<template>
  <CustomSlider
    :gradient="gradient"
    :thumb-color="thumbColor"
    :label="'Red'"
    :max="255"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  />
</template>

<style scoped lang="scss">

</style>