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
  border: 1px solid lightgray;
  border-radius: 4px;

  .material-icons {
    font-size: 20px;
  }

  &:hover {
    background-color: hsl(0, 0%, 93%);
    cursor: pointer;
    transition: .25s;
  }
}
</style>