export default {
  name: 'DraggableNums',
  props: ['board'],
  data() {
    return {
      draggableNums: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    handleDrag(e, num) {
      if (e.type == 'dragstart' || e.type == 'dragend')
        this.$emit('drag-num', e, num)
    }
  }
}