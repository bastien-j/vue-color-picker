<script setup lang="ts">
import { computed, ref } from 'vue';
import ColorArea from './ColorArea.vue';
import HueSlider from './HueSlider.vue';
import { isValidHSL } from '../colorParser';

const props = defineProps<{
  value?: string
}>()
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'open'): void
  (e: 'update', value: string): void
}>()
const show = ref(false)
const hue = ref(0)

const invalidValue = computed(() => props.value && !isValidHSL(props.value))

function open() {
  show.value = true
  emits('open')
}
function close() {
  show.value = false
  emits('close')
}
function toggle() {
  if (show.value) close()
  else open()
}

function emitCSSColor(e: string) {
  emits('update', e)
}

defineExpose({
  toggle
})
</script>

<template>
  <div class="clr-pckr-popup" :class="{show}">
    <div class="clr-pckr-header">
      Couleur
      <button  class="clr-pckr-btn"><span class="material-icons">close</span></button>
    </div>
    <template v-if="invalidValue">Invalid input value</template>
    <template v-else>
      <ColorArea :hue="hue" :initial-value="value" @update="emitCSSColor" lazy />
      <HueSlider v-model="hue" />
      <div class="clr-pckr-actions">
        <button class="clr-pckr-btn" @click="close()">
          <span class="material-icons">undo</span>
        </button>
        <button class="clr-pckr-btn" @click="close()">
          <span class="material-icons">done</span>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-popup {
  position: absolute;
  top: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 10px lightgray;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: sans-serif;

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
    transition: .25s;
  }

  .clr-pckr-btn {
    display: grid;
    place-content: center;
    padding: 8px;
    background-color: hsl(0, 0%, 100%);
    border: 1px solid lightgray;
    border-radius: 8px;
    font-size: 16px;

    &:hover {
      background-color: hsl(0, 0%, 93%);
      cursor: pointer;
      transition: .25s;
    }
  }

  .clr-pckr-header {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #6A6C7E;

    .clr-pckr-btn {
      margin-left: auto;
    }
  }

  .clr-pckr-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>