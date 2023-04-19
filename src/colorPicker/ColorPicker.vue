<script setup lang="ts">
import { ref } from 'vue';
import PickerPopup from './components/PickerPopup.vue';

const props = defineProps<{
  modelValue?: string
  value?: string
}>()
const emits = defineEmits(['update:modelValue', 'update'])

const popupRef = ref<InstanceType<typeof PickerPopup>>()
const currentColor = ref(props.modelValue ?? props.value ?? 'hsl(0, 0%, 0%)')

function toggle() {
  popupRef.value?.toggle()
}

function emitColor(color: string) {
  currentColor.value = color
  if (props.modelValue) emits('update:modelValue', color)
  else emits('update', color)
}
</script>

<template>
  <div class="clr-pckr">
    <button @click.prevent="toggle()"></button>
    <PickerPopup
      ref="popupRef"
      :color="currentColor"
      @update="emitColor($event)"
    />
  </div>
</template>

<style scoped lang="scss">
.clr-pckr {
  --size: 48px;

  position: relative;

  button {
    background-color: v-bind(currentColor);
    width: var(--size);
    height: var(--size);
    border-radius: 7px;
    border: none;
    box-shadow: 0 0 10px lightgray;

    &:not(:disabled) {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>