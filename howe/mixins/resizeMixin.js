export default {
  data() {
    return {
      pixels: null
    }
  },
  methods: {
    // 防抖
    debounce(fn, wait) {
      let timeout = null;
      return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      }
    },
    changeResize() {
      this.pixels = window.innerWidth || document.body.clientWidth
    }
  },
  mounted() {
    this.changeResize()
    window.addEventListener('resize', this.debounce(() => this.changeResize()))
  },
  destroyed() {
    window.removeEventListener('resize', this.changeResize)
  }
}
