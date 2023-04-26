<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import HueSlider from './HueSlider.vue';
import type { HSL } from '@/colorPicker/types';
import ColorArea from './ColorArea.vue';
import { hslToString, isValidHEX, parse } from '@/colorPicker/utils/colorParser';

const props = defineProps<{
  currentColor: HSL
}>()
const emits = defineEmits<{
  (e: 'update', value: string): void
}>()

const hue = ref(props.currentColor.h)
const saturation = ref(props.currentColor.s)
const lightness = ref(props.currentColor.l)
const hex = computed(() => hslToString({h: hue.value, s: saturation.value, l: lightness.value}, 'hex'))

function inputHandler(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value
  if (!isValidHEX(value)) value = hslToString(props.currentColor, 'hex')
  const { h, s, l } = parse(value, 'hsl')
  hue.value = h
  saturation.value = s
  lightness.value = l
}

watch([hue, saturation, lightness], () => {
  emits('update', hex.value)
})
</script>

<template>
  <div class="clr-pckr-area">
    <ColorArea :h="currentColor.h" v-model:s="saturation" v-model:l="lightness" />
    <HueSlider v-model="hue" />
    <input type="text" :value="hex" @change="inputHandler" />
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-area {
  display: grid;
  gap: 16px;
  padding: 16px;

  > input {
    padding: 7px;
    border-radius: 6px;
    border: 1px solid hsl(0, 0%, 80%);
    outline: none;
    transition: .15s;
    font-size: 16px;

    &:focus-within {
      border-color: hsl(207, 100%, 50%);
    }
  }
}
</style>