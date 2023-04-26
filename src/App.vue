<script setup lang="ts">
import { ref } from 'vue';

const HSL_COLOR = "hsl(113, 67%, 50%)"
const RGB_COLOR = "rgb(62, 213, 42)"
const HEX_COLOR = "#3ed52a"

const myColor = ref(HEX_COLOR)
</script>

<template>
  <!-- <div style="height: 300px"></div> -->
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
  font-family: sans-serif;
}
.pickers {
  display: flex;
  padding: 32px;
  gap: 32px;
}
</style>
