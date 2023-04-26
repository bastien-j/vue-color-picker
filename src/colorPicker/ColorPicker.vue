<script setup lang="ts">
import { ref } from 'vue';
import PopupLayout from './components/popup/PopupLayout.vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  modelValue?: string
  value?: string
}>()
const emits = defineEmits(['update:modelValue', 'update'])

const popupRef = ref()
const currentColor = ref(props.modelValue ?? props.value ?? 'hsl(0, 0%, 0%)')

function toggle() {
  popupRef.value.toggle()
}

function emitColor(color: string) {
  currentColor.value = color
  if (props.modelValue) emits('update:modelValue', color)
  else emits('update', color)
}

onClickOutside(popupRef, () => popupRef.value.close())
</script>

<template>
  <div class="clr-pckr">
    <button @click.prevent="toggle()"></button>
    <PopupLayout ref="popupRef" :color="currentColor" @update="emitColor($event)" />
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