<script setup lang="ts">
import type { ColorFormat } from '@/colorPicker/types';

const props = defineProps<{
  format: ColorFormat
}>()
defineEmits<{
  (e: 'update', value: typeof props.format): void
}>()
</script>

<template>
  <select
    class="clr-pckr-frmt-slct"
    :value="format"
    @change="$emit('update', ($event.target as HTMLSelectElement).value)"
  >
    <option value="hsl">HSL</option>
    <option value="rgb">RGB</option>
    <option value="hex">HEX</option>
  </select>
</template>

<style scoped lang="scss">
.clr-pckr-frmt-slct {
  padding: 4px 0 4px 4px;
  border-radius: 6px;
}
</style>