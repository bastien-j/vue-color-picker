<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>

<template>
  <button class="clr-pckr-btn">
    <span class="material-icons">{{ icon }}</span>
  </button>
</template>

<style scoped lang="scss">
.clr-pckr-btn {
  display: grid;
  place-content: center;
  padding: 4px;
  background-color: hsl(0, 0%, 100%);
  border: none;

  .material-icons {
    font-size: 16px;
  }

  &:is(:hover, :focus-visible, :active) {
    cursor: pointer;
    transition: .25s;
    color: hsl(207, 100%, 50%);
  }
}
</style>