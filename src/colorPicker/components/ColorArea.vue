<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { hslToHsv, hsvToHsl } from '../utils/colorParser'

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
  h: number,
  currentColor: string,
  s: number,
  l: number
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:s', value: number): void
  (e: 'update:l', value: number): void
}>()

const area = ref<Area>()
const areaDom = ref<HTMLDivElement>()
const cursorPos = ref<CursorPosition>({x: 0, y: 0})
const dragging = ref(false)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gradientColor = computed(() => `hsl(${props.h}, 100%, 50%)`)

const hsl = computed(() => hsvToHsl(
  props.h,
  (area.value ? cursorPos.value.x / area.value.width : 0),
  (area.value ? 1 - cursorPos.value.y / area.value.height : 0)
))

function moveCursor(e: { x: number, y: number }, emit = true) {
  if (!area.value) return
  const { x, y } = e
  cursorPos.value = {
    x: Math.max(0, Math.min(area.value.width, x - area.value.x)),
    y: Math.max(0, Math.min(area.value.height, y - area.value.y))
  }
  if (emit) nextTick(() => {
    emits('update:s', hsl.value.s)
    emits('update:l', hsl.value.l)
  })
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
  if (dragging.value || !area.value) return

  const { s, v } = hslToHsv(props.h, props.s, props.l)
  moveCursor({
    x: area.value.x + s * area.value.width,
    y: (area.value.y + area.value.height) - v * area.value.height
  }, false)
}
watch(() => props.s || props.l, () => {
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
    linear-gradient(90deg,#fff,v-bind(gradientColor));
  position: relative;
  user-select: none;

  .clr-pckr-area-cursor {
    position: absolute;
    background-color: v-bind(currentColor);
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