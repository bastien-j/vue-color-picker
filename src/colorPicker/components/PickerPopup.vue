<script setup lang="ts">
import { computed, ref } from 'vue';
import ColorArea from './ColorArea.vue';
import HueSlider from './HueSlider.vue';
import FormatSelector from './FormatSelector.vue';
import { useColor } from '../composables/color';
import { guessFormat, hslToString, isValidFormat, parse } from '../utils/colorParser';

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
  console.log(_format)
  console.log(_hslColor)
  // h.value = _hslColor.h
  // s.value = _hslColor.s
  // l.value = _hslColor.l
  // format.value = _format
}
function toggle() {
  if (show.value) close()
  else open()
}

function emitCSSColor() {
  emits('update', clrToStr.value)
}
// function hslHandler(event: HSL) {
//   // console.log(event)
//   currentColor.value = hslToString(event, colorFormat.value)
// }
function manualHandler(event: string) {
  if (!isValidFormat(event)) return
  console.log('manual update')
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
      <button  class="clr-pckr-btn" @click="close()">
        <span class="material-icons">close</span>
      </button>
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
        <FormatSelector v-model="format" :current-color="hslToString(hsl)" @update="manualHandler" />
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