<script setup lang="ts">
import { computed, ref } from 'vue';
import ColorArea from './ColorArea.vue';
import HueSlider from './HueSlider.vue';
import FormatSelector from './FormatSelector.vue';
import { useColor } from '../composables/color';
import { guessFormat, hslToString, isValidFormat, parse } from '../utils/colorParser';
import PopupButton from './PopupButton.vue';

const props = defineProps<{
  color: string
}>()
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'open'): void
  (e: 'update', value: string): void
}>()

const { format, h, s, l, hsl, clrToStr } = useColor(props.color)
const show = ref(false)

const invalidValue = computed(() => props.color && !isValidFormat(props.color))

function open() {
  show.value = true
  emits('open')
}
function close(emitColor?: boolean) {
  show.value = false
  emits('close')
  if (emitColor) emitCSSColor()
}
function reset(color?: string) {
  const _format = guessFormat(color ?? props.color)
  if (!_format) return
  const _hslColor = parse(color ?? props.color, 'hsl')
  h.value = _hslColor.h
  s.value = _hslColor.s
  l.value = _hslColor.l
  format.value = _format
}
function toggle() {
  if (show.value) close()
  else open()
}

function emitCSSColor() {
  emits('update', clrToStr.value)
}

function manualHandler(event: string) {
  if (!isValidFormat(event)) return
  reset(event)
}

defineExpose({
  toggle
})
</script>

<template>
  <div class="clr-pckr-popup" :class="{show}">
    <div class="clr-pckr-header">
      <div class="clr-pckr-preview" :style="{backgroundColor: clrToStr}"></div>
      <PopupButton icon="close" @click="close()" />
    </div>
    <template v-if="invalidValue">Invalid input value</template>
    <template v-else>
      <ColorArea
        :current-color="clrToStr"
        :h="h"
        v-model:s="s"
        v-model:l="l"
      />
      <div class="clr-pckr-infos">
        <HueSlider v-model="h" />
        <!-- <FormatSelector v-model="format" :current-color="hslToString(hsl)" @update="manualHandler" /> -->
      </div>
      <div class="clr-pckr-actions">
        <PopupButton icon="undo" @click="reset()" />
        <PopupButton icon="check" @click="close(true)" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-popup {
  --pad: 8px;

  position: absolute;
  top: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px lightgray;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  transition: .25s;
  max-width: 250px;
  width: 250px;
  z-index: 2023;

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  .clr-pckr-header {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #6A6C7E;
    padding: var(--pad);

    .clr-pckr-preview {
      width: 42px;
      height: 42px;
      border-radius: 99px;
      box-shadow: 0 0 10px lightgray;
    }
    .clr-pckr-btn {
      margin-left: auto;
    }
  }

  .clr-pckr-infos {
    // padding: calc(2 * var(--pad)) var(--pad) 0px var(--pad);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .clr-pckr-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pad);
  }
}
</style>