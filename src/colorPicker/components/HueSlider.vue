<script setup lang="ts">
type Props = {
  modelValue?: number
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="clr-pckr-hue-slider"
    type="range"
    min="0"
    max="359"
    :value="modelValue ?? 0"
    @input="$emit('update:modelValue', parseInt(($event.target as HTMLInputElement).value))"
  />
</template>

<style scoped lang="scss">
.clr-pckr-hue-select {
  width: 100%;
  // background-image: linear-gradient(to right,red 0,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red 100%);
  background-image: linear-gradient(to right,hsl(319, 96%, 49%) 0,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red 100%);
}
</style>