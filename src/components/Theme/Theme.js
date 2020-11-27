export default {
  name: 'Theme',
  props: [],
  data() {
    return {
      themes: [
        { themeName: 'Purple', themeColor: '#A754EE' },
        { themeName: 'Blue', themeColor: '#45CCDE' },
        { themeName: 'Green', themeColor: '#66FFA6' },
        { themeName: 'Red', themeColor: '#DF444B' }
      ],
      activeTheme: { themeName: 'Purple', themeColor: '#A754EE' },
      openThemes: false
    }
  },
  methods: {
    smartPosition() {
      let bounds = document.querySelector('.selectedValue').getBoundingClientRect()
      let container = document.querySelector('.selection_container')
      let containerHeight = container.getBoundingClientRect().height
      let newTop = bounds.top - (containerHeight / 2)
      while ((newTop + containerHeight) > window.innerHeight) {
        newTop -= 20
      }
      container.style.top = `${newTop}px`
      container.style.left = `${bounds.left + bounds.width + 20}px`
    },
    themeSelection() {
      if (this.openThemes) {
        this.openThemes = false
        document.querySelector('.selection_container').style.display = 'none'
      } else {
        this.openThemes = true
        document.querySelector('.selection_container').style.display = 'block'
        this.smartPosition()
      }
    },
    themeChange(theme) {
      document.querySelector('.selectedValue').style.border = `1px solid ${theme.themeColor}`
      document.querySelector('.selectedValue').style.color = theme.themeColor
      this.activeTheme = theme.themeName
      this.openThemes = true
      this.themeSelection()
    }
  },
  mounted() {
    this.smartPosition()
    this.themeChange(this.activeTheme)
    window.addEventListener('resize', this.smartPosition)
  },
  unmounted() {
    window.removeEventListener('resize', this.smartPosition)
  },
}