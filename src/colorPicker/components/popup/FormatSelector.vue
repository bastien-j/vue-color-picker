<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
defineEmits<{
  (e: 'update:model-value', value: typeof props.modelValue): void
}>()
</script>

<template>
  <select
    class="clr-pckr-frmt-slct"
    :value="modelValue"
    @change="$emit('update:model-value', ($event.target as HTMLSelectElement).value)"
  >
    <option value="hsl">HSL</option>
    <option value="rgb">RGB</option>
  </select>
</template>

<style scoped lang="scss">
.clr-pckr-frmt-slct {
  padding: 4px 0 4px 4px;
  border-radius: 6px;
}
</style>