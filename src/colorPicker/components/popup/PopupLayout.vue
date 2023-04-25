<script setup lang="ts">
import PopupButton from '../buttons/PopupButton.vue';
import FormatSelector from './FormatSelector.vue';
import HSLPicker from './formats/HSLPicker.vue';

</script>

<template>
  <div class="clr-pckr-popup">
    <div class="clr-pckr-body">
      <HSLPicker />
    </div>
    <div class="clr-pckr-footer">
      <FormatSelector />
      <PopupButton icon="content_copy" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.clr-pckr-popup {
  background: hsl(0, 100%, 100%);
  border-radius: 16px;
  box-shadow: hsl(0, 0%, 90%) 0 0 10px;
  min-width: 200px;

  .clr-pckr-footer {
    box-shadow: hsl(0, 0%, 90%) 0 -1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }
}
</style>