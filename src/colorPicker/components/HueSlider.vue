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
    max="360"
    :value="modelValue ?? 0"
    @input="$emit('update:modelValue', parseInt(($event.target as HTMLInputElement).value))"
  />
</template>

<style scoped lang="scss">
.clr-pckr-hue-slider {
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background-image: linear-gradient(to right,red 0,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red 100%);

  &::-webkit-slider-thumb {
    appearance: none;
    background-color: Hsl(v-bind(modelValue), 100%, 50%);
    border-radius: 999px;
    width: 20px;
    height: 20px;
    border: 3px solid white;
    cursor: pointer;
    box-shadow: 0 0 5px hsl(0, 0%, 50%);
  }
}
</style>