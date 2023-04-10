<script setup lang="ts">
import { ref } from 'vue';

const myColor = ref('hsl(0, 0%, 0%)')
</script>

<template>
  <div class="pickers">
    <ColorPicker :value="myColor" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.pickers {
  display: flex;
  padding: 32px;
  gap: 32px;
}
</style>
