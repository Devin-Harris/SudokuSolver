import DraggableNums from '@/components/DraggableNums'
import ClickSection from '@/components/ClickSection'
import Theme from '@/components/Theme'
export default {
  name: 'Actions',
  props: ['board', 'calcTheme', 'solveSection', 'solved'],
  components: {
    DraggableNums,
    ClickSection,
    Theme
  },
  data() {
    return {
      isRulesOpen: false,
      isWorksOpen: false,
      rulesContent: [
        "The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each containing nine squares. The rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.",
        "You can click on an individual square in the board and type a numeric value (1-9) to fill a piece on the board. You can also drag a number from this actions panel into the board as well. If you select a square and hit the keys 0, Backspace, Delete, or Escape that pieces value will be removed. If you make an invalid entry the board will toggle the pieces that are causing the board to be invalid and you must fix them in order to continue adding to the board. Once the board is filled, click the solve button and watch the algorithm do its magic!",
        "Thanks for checking out this project!"
      ],
      worksContent: [
        "This Sudoku solver uses a solving algorithm which employs recursive functions, backtracking, and checks for rows, columns, and boxes to ensure the numbers 1-9 are played on all dimensions without repetition.",
        "Basically the algorithm starts at the top left of the board and moves to the right looking for unfilled positions. Once an empty position is found, a 1 is put in that spot. If 1 is already played in the row, col, or box, a 2 is placed in that spot. This step is repeated for numbers 1-9 until a valid placement is made. The next spot in the row follows the same logic and once the last position in a row is filled the next row begins being filled. After the last position in the last row is filled the board is solved. If a position cannot be filled the algorithm starts over with the first element that has another possible valid entry. Once all spots have ran through all possible valid entries the board is marked as unsolvable.",
        "This project was made using Vue"
      ]
    }
  },
  methods: {
    dragNum(e, num) {
      this.$emit('drag-num', e, num)
    },
    rulesOpen() {
      this.isRulesOpen = !this.isRulesOpen
    },
    worksOpen() {
      this.isWorksOpen = !this.isWorksOpen
    },
    githubRD() {
      window.open('https://github.com/Devin-Harris/SudokuSolver')
    },
    styleBoard() {

      // Blue Theme
      // let colors = ['#45CCDE', '#49D2DC', '#4DD9DA', '#50DED8', '#55E4D7', '#58EAD6', '#5CF0D3', '#60F6D2', '#64FBD0']
      // Red Theme
      // let colors = ['#DF444B', '#E34853', '#E74D5C', '#EB5164', '#EE546B', '#F25873', '#F55C7B', '#FA6184', '#FD648C']
      // Purple Theme
      let colors = ['#6D45E0', '#7C49E3', '#8A4CE7', '#9951EB', '#A754EE', '#B859F2', '#C55CF6', '#D560F9', '#E464FD']

      for (let i = 0; i < 9; i++) {
        let cols = document.querySelectorAll(`.col-${i}`)
        cols.forEach(col => {
          col.style.pointerEvents = 'none'
          if (col.children[0].value == '')
            col.children[0].style.backgroundColor = colors[i]
          else
            col.classList.add('sort_unhighlight')
        })
      }
    },
    unSolvable() {
      document.getElementById('solveButton').classList.add('unsolvable')
      this.$emit('invalid-solve')
    },
    solveClick() {
      if (this.solved) {
        document.getElementById('solveButton').classList.remove('reset')
        let allBoardPositions = document.querySelectorAll('.board_col')
        Array.from(allBoardPositions).forEach(position => {
          position.classList.remove('hover_highlight', 'invalid_highlight', 'entered_highlight', 'calculated_highlight', 'sort_unhighlight')
          position.children[0].value = ''
          position.children[0].style.backgroundColor = ''
          position.style.pointerEvents = 'all'
        })
        this.$emit('reset-puzzle')
        return
      }

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (this.board[i][j].value) {
            let num = this.board[i][j].value
            this.board[i][j].value = null
            if (!this.noConflicts(i, j, num)) {
              this.board[i][j].value = num
              this.unSolvable()
              return
            }
            this.board[i][j].value = num
          }
        }
      }
      this.styleBoard()
      this.solveSudoku(0, 0)
      document.getElementById('solveButton').classList.add('reset')
      this.$emit('solved-puzzle')
    },
    solveSudoku(row, col) {
      var cell = this.findUnassignedLocation(row, col)
      row = cell[0]
      col = cell[1]
      // base case: if no empty cell  
      if (row == -1) {
        return true
      }

      for (var num = 1; num <= 9; num++) {
        if (this.noConflicts(row, col, num)) {
          this.$emit('update-board-val', row, col, true, num)

          if (this.solveSudoku(row, col)) {
            return true
          }

          // mark cell as empty (with 0)    
          this.$emit('update-board-val', row, col, false)
        }
      }

      // trigger back tracking
      return false
    },
    findUnassignedLocation(row, col) {
      var done = false
      var res = [-1, -1]

      while (!done) {
        if (row == 9) {
          done = true
        }
        else {
          if (!this.board[row][col].value) {
            res[0] = row
            res[1] = col
            done = true
          }
          else {
            if (col < 8) {
              col++
            }
            else {
              row++
              col = 0
            }
          }
        }
      }

      return res
    },
    noConflicts(row, col, num) {
      return this.isRowOk(row, num) && this.isColOk(col, num) && this.isBoxOk(row, col, num)
    },
    isRowOk(row, num) {
      for (var col = 0; col < 9; col++)
        if (this.board[row][col].value == num)
          return false

      return true
    },
    isColOk(col, num) {
      for (var row = 0; row < 9; row++)
        if (this.board[row][col].value == num)
          return false

      return true
    },
    isBoxOk(row, col, num) {
      row = Math.floor(row / 3) * 3
      col = Math.floor(col / 3) * 3

      for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
          if (this.board[row + r][col + c].value == num)
            return false

      return true
    }
  },
  watch: {
    isRulesOpen() {
      if (this.isRulesOpen)
        document.querySelector('.overlay').style.display = 'block'
      else
        document.querySelector('.overlay').style.display = 'none'

    },
    isWorksOpen() {
      if (this.isWorksOpen)
        document.querySelector('.overlay').style.display = 'block'
      else
        document.querySelector('.overlay').style.display = 'none'
    }
  },
}