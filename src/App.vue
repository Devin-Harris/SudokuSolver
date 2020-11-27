<template>
  <div class="main_container">
    <Actions
      @drag-num="dragNum"
      @update-board-val="updateBoardVal"
      @invalid-solve="invalidSolve"
      @reset-puzzle="resetBoard"
      @solved-puzzle="solveBoard"
      :solveSection="solveSection"
      :board="board"
      :solved="solved"
    />
    <PuzzleBoard
      @drag-to-board="dragBoard"
      @invalid-check="invalidCheck"
      :board="board"
      :updateNum="boardPieceToUpdateNum"
      :solved="solved"
    />
  </div>
</template>

<script>
import PuzzleBoard from "@/components/PuzzleBoard";
import Actions from "@/components/Actions";
export default {
  name: "App",
  data() {
    return {
      board: [],
      boardPieceToUpdateNum: 0,
      solveSection: {
        section: "solve",
        message: "Solve the puzzle..."
      },
      solved: false
    };
  },
  components: {
    PuzzleBoard,
    Actions
  },
  methods: {
    resetBoard() {
      this.solved = false;
      this.solveSection.message = "Solve the puzzle...";
      this.board = [];
      this.makeEmptyBoard();
    },
    solveBoard() {
      this.solved = true;
      this.solveSection.message = "Reset the board...";
      console.log(this.solved);
    },
    makeEmptyBoard() {
      for (let i = 0; i < 9; i++) {
        this.board[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
          this.board[i][j] = {
            row: i,
            col: j,
            value: null,
            calculated: false
          };
        }
      }
    },
    updateBoardVal(row, col, calculated, key = null) {
      this.board[row][col].value = key;
      this.board[row][col].calculated = calculated;

      this.boardPieceToUpdateNum = 0;

      this.invalidCheck();
    },
    invalidCheck() {
      if (!document.querySelector(".invalid_highlight")) {
        document.getElementById("solveButton").classList.remove("unsolvable");
        this.solveSection.message = "Solve the puzzle...";
      }
    },
    invalidSolve() {
      this.solveSection.message = "This is an invalid puzzle!";
    },
    dragNum(e, num) {
      event.dataTransfer.effectAllowed = "all";
      if (e.type == "dragstart") this.boardPieceToUpdateNum = num;
      if (e.type == "dragover" || e.type == "dragenter")
        e.dataTransfer.dropEffect = "move";
      if (e.type == "dragend" || e.type == "drop") {
        this.boardPieceToUpdateNum = 0;
        this.removeHoverHighlight();
      }
    },
    removeHoverHighlight() {
      let allBoardPositions = document.querySelectorAll(".board_col");
      Array.from(allBoardPositions).forEach(position => {
        position.classList.remove("hover_highlight");
      });
    },
    dragBoard(e, col, row) {
      if (e.type == "mouseenter" && this.boardPieceToUpdateNum)
        this.updateBoardVal(row, col, false, this.boardPieceToUpdateNum);
    }
  },
  beforeMount() {
    //Set up initial empty board
    this.makeEmptyBoard();
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.main_container {
  min-height: 100vh;
  height: max-content;
  width: 100vw;
  display: grid;
  grid-template-columns: 40vw 60vw;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
}

// Extra small devices (portrait phones, less than 576px)
// No media query since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (max-width: 768px) {
  * {
    &:focus {
      background: unset;
      color: unset;
    }
  }
  .main_container {
    grid-template-columns: 100vw;
  }
}

// Large devices (desktops, 992px and up)
@media (max-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>
