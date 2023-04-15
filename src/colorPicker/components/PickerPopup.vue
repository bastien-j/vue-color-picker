<script setup lang="ts">
import { computed, ref } from 'vue';
import ColorArea from './ColorArea.vue';
import HueSlider from './HueSlider.vue';
import FormatSelector from './FormatSelector.vue';
import { guessFormat, isValidFormat, parseHSV } from '../colorParser';
import type { ColorFormat } from '../types';

const props = defineProps<{
  value?: string
}>()
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'open'): void
  (e: 'update', value: string): void
}>()
const show = ref(false)
const hue = ref(props.value ? parseHSV(props.value).h : 0)
const currentColor = ref(props.value ?? '')
const colorFormat = ref<ColorFormat>(guessFormat(currentColor.value) ?? 'rgb')
const formattedColor = ref(currentColor.value)

const invalidValue = computed(() => props.value && !isValidFormat(props.value))

function open() {
  show.value = true
  emits('open')
}
function close(emitColor?: boolean) {
  show.value = false
  emits('close')
  if (emitColor) emitCSSColor()
}
function reset() {
  if (props.value !== undefined) {
    currentColor.value = props.value
    hue.value = parseHSV(props.value).h
  }
}
function toggle() {
  if (show.value) close()
  else open()
}

function emitCSSColor() {
  if (formattedColor.value !== currentColor.value) emits('update', formattedColor.value)
  else emits('update', currentColor.value)
}

defineExpose({
  toggle
})
</script>

<template>
  <div class="clr-pckr-popup" :class="{show}">
    <div class="clr-pckr-header">
      Couleur
      <button  class="clr-pckr-btn" @click="close()"><span class="material-icons">close</span></button>
    </div>
    <template v-if="invalidValue">Invalid input value</template>
    <template v-else>
      <ColorArea :hue="hue" v-model="currentColor" />
      <div class="clr-pckr-infos">
        <HueSlider v-model="hue" />
        <FormatSelector v-model="colorFormat" :current-color="currentColor" @update:format="formattedColor = $event" />
      </div>
      <div class="clr-pckr-actions">
        <button class="clr-pckr-btn" @click="reset()">
          <span class="material-icons">undo</span>
        </button>
        <button class="clr-pckr-btn" @click="close(true)">
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
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  transition: .25s;
  max-width: 300px;

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
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
    padding: 16px;

    .clr-pckr-btn {
      margin-left: auto;
    }
  }

  .clr-pckr-infos {
    padding: 16px 16px 0px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .clr-pckr-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }
}
</style>