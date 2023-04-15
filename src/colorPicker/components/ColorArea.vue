<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { hsvToHsl, parseHSV } from '../colorParser'
import { watch } from 'vue';

type Area = {
  x: number
  y: number
  width: number
  height: number
}
type CursorPosition = {
  x: number
  y: number
}
type Props = {
  hue: number
  modelValue?: string,
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update', value: string): void
  (e: 'update:modelValue', value: string): void
}>()

const area = ref<Area>()
const areaDom = ref<HTMLDivElement>()
const cursorPos = ref<CursorPosition>({x: 0, y: 0})
const dragging = ref(false)

const hslCSS = computed(() => {
  const { h, s, l } = hsvToHsl(
    props.hue,
    (area.value ? cursorPos.value.x / area.value.width : 0) * 100,
    (area.value ? 1 - cursorPos.value.y / area.value.height : 0) * 100
  )

  return `hsl(${h}, ${s}%, ${l}%)`
})

function emitValue() {
  nextTick(() => {
    if (props.modelValue !== undefined) emits('update:modelValue', hslCSS.value)
    else emits('update', hslCSS.value)
  })
}

function moveCursor(e: { x: number, y: number }, force = false) {
  if (!dragging.value && !force) return
  if (!area.value) return
  const { x, y } = e
  cursorPos.value = {
    x: Math.max(0, Math.min(area.value.width, x - area.value.x)),
    y: Math.max(0, Math.min(area.value.height, y - area.value.y))
  }
  emitValue()
}
function startDragging() {
  document.addEventListener('pointermove', moveCursor)
  document.addEventListener('pointerup', stopDragging)
  dragging.value = true
}
function stopDragging() {
  dragging.value = false
  document.removeEventListener('pointermove', moveCursor)
  document.removeEventListener('pointerup', stopDragging)
}

function parseModelValue() {
  if (dragging.value || !props.modelValue || !area.value) return

  const { s, v } = parseHSV(props.modelValue)
  moveCursor({
    x: area.value.x + s * area.value.width / 100,
    y: (area.value.y + area.value.height) - v * area.value.height / 100
  }, true)
}

watch(() => props.hue, () => {
  emitValue()
})
watch(() => props.modelValue, () => {
  parseModelValue()
})

onMounted(() => {
  if (areaDom.value) {
    const { x, y, width, height } = areaDom.value.getBoundingClientRect()
    area.value = { x, y, width, height }
  }
  parseModelValue()
})
</script>

<template>
  <div 
    ref="areaDom"
    class="clr-pckr-area"
    @click="moveCursor($event, true)"
    @pointerdown="startDragging"
  >
    <div
      class="clr-pckr-area-cursor"
      :style="{left: `${cursorPos.x}px`, top: `${cursorPos.y}px`}"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-area {
  width: 300px;
  height: 200px;
  background-image:
    linear-gradient(rgba(0,0,0,0),#000),
    linear-gradient(90deg,#fff,Hsl(v-bind(hue), 100%, 50%));
  position: relative;
  user-select: none;

  .clr-pckr-area-cursor {
    position: absolute;
    background-color: v-bind(hslCSS);
    border-radius: 999px;
    width: 20px;
    height: 20px;
    border: 3px solid white;
    cursor: pointer;
    transform: translate3d(-50%, -50%, 0);
    box-shadow: 0 0 5px hsl(0, 0%, 50%);
  }
}
</style>