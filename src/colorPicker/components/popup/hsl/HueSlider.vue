<script setup lang="ts">
import { computed } from 'vue';
import CustomSlider from '../../sliders/CustomSlider.vue';

const props = defineProps<{
  modelValue: number
}>()
defineEmits<{
  (e: 'update:model-value', value?: typeof props.modelValue): void
}>()

const gradientColor = computed(() => `hsl(${props.modelValue}, 100%, 50%)`)
</script>

<template>
  <CustomSlider
    :gradient="'linear-gradient(to right,red,#ff0,#0f0,#0ff,#00f,#f0f,red)'"
    :thumb-color="gradientColor"
    :label="'Hue'"
    :max="360"
    :model-value="modelValue"
    @update:model-value="$emit('update:model-value', $event)"
  />
</template>

<style scoped lang="scss">

</style>