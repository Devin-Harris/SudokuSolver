export default {
  name: 'PuzzleBoard',
  props: ['board', 'updateNum', 'solved'],
  data() {
    return {
      dragNum: 0,
      isAnyInvalids: false
    }
  },
  methods: {
    handleReleaseDrag(e, col, row) {
      if (this.dragNum) {
        this.positionFocus(e, row, col, true)
        let boardPosition = this.$el.children[0].children[row].children[col]
        boardPosition.classList.add('entered_highlight')
      }
      this.removeHoverHighlight()
      this.$emit('drag-to-board', e, col, row)
    },
    handleOverDrag(e, col, row) {
      if (this.updateNum && e.type == 'drop')
        this.dragNum = this.updateNum
      this.removeHoverHighlight()
      if (e.type == 'dragenter')
        this.$el.children[0].children[row].children[col].classList.add('hover_highlight')
      e.preventDefault()
    },
    removeHoverHighlight() {
      let allBoardPositions = document.querySelectorAll('.board_col')
      Array.from(allBoardPositions).forEach(position => {
        position.classList.remove('hover_highlight')
      })
    },
    styleBoardSubGrids() {
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board.length; j++) {
          let row = this.$el.children[0].children[i]
          let boardPosition = row.children[j]
          // If on side of subgrid, add extra border
          if (i === 2 || i === 5)
            boardPosition.classList.add('bottom_highlight')
          if (i === 3 || i === 6)
            boardPosition.classList.add('top_highlight')
          if (j === 2 || j === 5)
            boardPosition.classList.add('right_highlight')
          if (j === 3 || j === 6)
            boardPosition.classList.add('left_highlight')

          // If calculated position, fill with purple
          if (this.board[i][j].calculated)
            boardPosition.classList.add('calculated_highlight')
        }
      }
    },
    positionFocus(e, row, col, wasDrag = false) {
      const keysAllowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      let elm = this.$el.children[0].children[row].children[col]
      this.isAnyInvalids = false
      let num = null
      let isKeyFound = false
      if (wasDrag) {
        if (this.dragNum)
          num = this.dragNum
        else
          return
      } else {
        isKeyFound = keysAllowed.find(key => key == e.key)
        if (isKeyFound) {
          num = e.key
          let rowElm = this.$el.children[0].children[row]
          let boardPosition = rowElm.children[col]
          boardPosition.classList.add('entered_highlight')
        } else {
          //Reset board to empty
          e.preventDefault()
          if (e.key == 0 || e.key == 'Backspace' || e.key == 'Delete' || e.key == 'Escape') {
            this.board[row][col].value = null
            elm.children[0].value = ''
            this.$emit('update-board-val', row, col, false, null)
            let rowElm = this.$el.children[0].children[row]
            let boardPosition = rowElm.children[col]
            boardPosition.classList.remove('entered_highlight')
            boardPosition.classList.remove('invalid_highlight')
          }
        }
      }

      if (isKeyFound || wasDrag) {
        //Set board to numeric val
        if (elm.children[0] == document.activeElement || wasDrag) {
          if (this.isRowOk(row, num) && this.isColOk(col, num) && this.isBoxOk(row, col, num)) {
            elm.classList.remove('invalid_highlight')
            this.board[row][col].value = num
            this.testInvalids(elm.children[0].value)
            if (Array.from(document.querySelectorAll('.invalid_highlight')).length) {
              Array.from(document.querySelectorAll('.board_col')).forEach(colElm => colElm.style.pointerEvents = 'none')
              Array.from(document.querySelectorAll('.invalid_highlight')).forEach(colElm => colElm.style.pointerEvents = 'all')
            } else {
              Array.from(document.querySelectorAll('.board_col')).forEach(colElm => colElm.style.pointerEvents = 'all')
              this.$emit('invalid-check')
            }
          } else {
            this.highlightInvalids(row, col, num)
            elm.classList.add('invalid_highlight')
            Array.from(document.querySelectorAll('.board_col')).forEach(colElm => colElm.style.pointerEvents = 'none')
            Array.from(document.querySelectorAll('.invalid_highlight')).forEach(colElm => colElm.style.pointerEvents = 'all')
          }
          this.$emit('update-board-val', row, col, false, num)
          e.preventDefault()
          document.querySelectorAll('.board_col').forEach(boardPosition => {
            if (boardPosition.classList.contains('invalid_highlight'))
              this.isAnyInvalids = true
          })
        }
      }

      this.dragNum = 0
    },
    focusOnInput(e) {
      e.target.children[0].focus()
    },
    testInvalids(num) {
      Array.from(document.querySelectorAll('.invalid_highlight')).forEach(colElm => {
        // Get elm pos in board
        let col = colElm.classList[1].split('-')[1]
        let row = colElm.parentElement.classList[1].split('-')[1]
        this.board[row][col].value = null
        if (this.isRowOk(row, num) && this.isColOk(col, num) && this.isBoxOk(row, col, num)) {
          this.$el.children[0].children[row].children[col].classList.remove('invalid_highlight')
        }
        this.board[row][col].value = this.$el.children[0].children[row].children[col].children[0].value
      })
    },
    highlightInvalids(row, col, num) {
      this.board[row][col].value = null
      let rowCheck = this.isRowOk(row, num)
      let colCheck = this.isColOk(col, num)
      let boxCheck = this.isBoxOk(row, col, num)
      this.board[row][col].value = num

      if (!rowCheck) {
        document.querySelector(`.row-${row}`).children.forEach((colElm, col_index) => {
          if (colElm.children[0].value == num) {
            colElm.classList.add('invalid_highlight')
          }
        })
      }

      if (!colCheck) {
        Array.from(document.querySelectorAll(`.col-${col}`)).forEach((colElm, row_index) => {
          if (colElm.children[0].value == num) {
            colElm.classList.add('invalid_highlight')
          }
        })
      }

      if (!boxCheck) {
        let boxRow = Math.floor(row / 3) * 3
        let boxCol = Math.floor(col / 3) * 3

        for (var r = 0; r < 3; r++) {
          for (var c = 0; c < 3; c++) {
            let pos = document.querySelector(`.row-${boxRow + r} .col-${boxCol + c}`)
            if (pos.children[0].value == num) {
              pos.classList.add('invalid_highlight')
            }
          }
        }
      }

    },
    isRowOk(row, num) {
      for (var col = 0; col < 9; col++) {
        if (this.board[row][col].value == num)
          return false
      }

      return true
    },
    isColOk(col, num) {
      for (var row = 0; row < 9; row++) {
        if (this.board[row][col].value == num)
          return false
      }

      return true
    },
    isBoxOk(row, col, num) {
      row = Math.floor(row / 3) * 3
      col = Math.floor(col / 3) * 3

      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 3; c++) {
          if (this.board[row + r][col + c].value == num)
            return false
        }
      }

      return true
    }
  },
  updated() {
    this.styleBoardSubGrids()
  },
  mounted() {
    this.styleBoardSubGrids()
  }
}