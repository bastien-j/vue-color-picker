<script setup lang="ts">
type Props = {
  modelValue?: number
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="clr-pckr-alpha-slider"
    type="range"
    min="0"
    max="1"
    step="0.01"
    :value="modelValue ?? 0"
    @input="$emit('update:modelValue', parseInt(($event.target as HTMLInputElement).value))"
  />
</template>

<style scoped lang="scss">
.clr-pckr-alpha-slider {
  width: 100%;
}
</style>