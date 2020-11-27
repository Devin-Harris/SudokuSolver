<template>
  <div class="puzzle_container">
    <div class="board_container">
      <div
        class="board_row"
        :class="'row-' + row_index"
        v-for="(row, row_index) in board"
        :key="row_index"
      >
        <div
          class="board_col"
          :class="`col-${col_index}`"
          v-for="(col, col_index) in row"
          :key="col_index"
          :tabindex="isAnyInvalids ? -1 : 1"
          @click="focusOnInput($event)"
          @mouseenter="handleReleaseDrag($event, col_index, row_index)"
          @drop.prevent="handleOverDrag($event, col_index, row_index)"
          @dragenter.prevent="handleOverDrag($event, col_index, row_index)"
          @dragover.prevent
        >
          <input
            type="text"
            @click.stop
            @keydown="positionFocus($event, row_index, col_index)"
            :value="board[row_index][col_index].value"
          />
          <!-- <p>
          {{ board[row_index][col_index].value }}
        </p> -->
        </div>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script src="./PuzzleBoard.js"></script>

<style src="./PuzzleBoard.scss" lang="scss"></style>
