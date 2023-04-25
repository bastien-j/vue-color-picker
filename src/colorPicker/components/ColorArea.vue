<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
const cursorPos = computed<CursorPosition>(() => {
  if (!area.value) return {x: 0, y: 0}
  const { s, v } = hslToHsv(props.h, props.s, props.l)
  return {
    x: s * area.value.width,
    y: (1 - v) * area.value.height
  }
})
const dragging = ref(false)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gradientColor = computed(() => `hsl(${props.h}, 100%, 50%)`)

function moveCursor(e: { pageX: number, pageY: number }, emit = true) {
  if (!area.value) return
  const { pageX: x, pageY: y } = e
  const posX = Math.max(0, Math.min(area.value.width, x - area.value.x))
  const posY = Math.max(0, Math.min(area.value.height, y - area.value.y))
  if (emit) {
    const { s, l } = hsvToHsl(props.h, posX / area.value.width, 1 - posY / area.value.height)
    emits('update:s', s)
    emits('update:l', l)
  }
}
function startDragging() {
  updateArea()
  document.addEventListener('pointermove', moveCursor)
  document.addEventListener('pointerup', stopDragging)
  dragging.value = true
}
function stopDragging() {
  dragging.value = false
  document.removeEventListener('pointermove', moveCursor)
  document.removeEventListener('pointerup', stopDragging)
}

function updateArea() {
  if (areaDom.value) {
    const { x, y, width, height } = areaDom.value.getBoundingClientRect()
    area.value = { x, y, width, height }
  }
}

onMounted(() => {
  updateArea()
  if (area.value) {
    const { s, v } = hslToHsv(props.h, props.s, props.l)
    moveCursor({
      pageX: area.value.x + s * area.value.width,
      pageY: (area.value.y + area.value.height) - v * area.value.height
    })
  }
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
  width: 100%;
  aspect-ratio: 3/2;
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