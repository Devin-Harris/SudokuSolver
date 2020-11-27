<template>
  <div class="draggables">
    <div
      class="drag_num"
      v-for="num in draggableNums"
      :key="num"
      draggable="true"
      @dragstart="handleDrag($event, num)"
      @dragend="handleDrag($event, num)"
      @drop="handleDrag($event, num)"
      @dragenter.prevent
      @dragover.prevent
    >
      <p>{{ num }}</p>
    </div>
  </div>
</template>

<script src="./DraggableNums.js"></script>

<style src="./DraggableNums.scss" lang="scss"></style>
