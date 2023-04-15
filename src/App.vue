<script setup lang="ts">
import { ref } from 'vue';

const myColor = ref("hsl(113, 67%, 50%)")
</script>

<template>
  <div class="pickers">
    <ColorPicker v-model="myColor" />
    Current color : {{ myColor }}
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
