<script setup lang="ts">
import { computed, ref, watch, type StyleValue } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: number
  gradient?: string
  thumbColor?: string
  min?: number
  max?: number
  step?: number
  label?: string
  hideHeader?: boolean
}>(), {
  min: 0,
  max: 100,
  step: 1,
  modelValue: 0
})
const emits = defineEmits<{
  (e: 'update:model-value', value: typeof props.modelValue): void
}>()

const inputValue = ref(props.modelValue ?? 0)

const inputStyles = computed(() => {
  const styles: StyleValue = {}
  if (props.gradient) styles.backgroundImage = props.gradient
  if (props.thumbColor) styles['--thmb-clr'] = props.thumbColor
  return styles
})

function inputHandler(event: Event) {
  const target = event.target as HTMLInputElement
  let value = minmax(parseInt(target.value))
  if (Number.isNaN(value)) value = props.modelValue
  inputValue.value = value
  emits('update:model-value', value)
}

function minmax(value: number) {
  return Math.max(props.min, Math.min(props.max, value))
}

watch(() => props.modelValue, () => {
  inputValue.value = props.modelValue
})
</script>

<template>
  <div class="clr-pckr-sldr">
    <div v-if="!hideHeader" class="clr-pckr-sldr-hdr">
      <span>{{ label ?? 'Value' }}</span>
      <input type="text" :maxlength="max.toString().length" v-model="inputValue" @change="inputHandler" />
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:model-value', parseInt(($event.target as HTMLInputElement).value))"
      :style="inputStyles"
    />
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-sldr {
  --sldr-sz: 10px;

  > .clr-pckr-sldr-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;

    > input {
      width: 40px;
      padding: 4px 7px;
      text-align: center;
      border-radius: 6px;
      border: 1px solid transparent;
      outline: none;
      transition: .15s;

      &:hover {
        border-color: hsl(0, 0%, 80%);
      }
      &:focus-within {
        border-color: hsl(207, 100%, 50%);
      }
    }
  }

  > input[type="range"] {
    --thmb-clr: hsl(0, 0%, 30%);

    appearance: none;
    width: 100%;
    height: var(--sldr-sz);
    border-radius: 999px;
    background-image: linear-gradient(to right,white 0,#7096ff 100%);
    border: 1px solid hsl(0, 0%, 90%);

    &::-webkit-slider-thumb {
      --thmb-brd-sz: 4px;
      --thmb-sz: calc(var(--sldr-sz) + 2 * var(--thmb-brd-sz));

      appearance: none;
      background-color: var(--thmb-clr);
      border-radius: 999px;
      width: var(--thmb-sz);
      height: var(--thmb-sz);
      border: var(--thmb-brd-sz) solid white;
      cursor: pointer;
      box-shadow:
        0 0 2px hsl(0, 0%, 0%),
        inset 0 0 1px hsl(0, 0%, 40%);
    }
  }
}
</style>