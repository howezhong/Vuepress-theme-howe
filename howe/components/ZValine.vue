<template>
  <div id="vcomments"></div>
</template>
<script>

export default {
  name: 'ZValine',
  methods: {
    valine () {
      const Valine = require('valine')
      const AV = require('leancloud-storage')
      if (typeof window !== 'undefined') {
        this.window = window
        window.AV = AV
      }
      new Valine(Object.assign({ el: '#vcomments' }, this.$themeConfig.valine))
    }
  },
  mounted () {
    this.valine()
  }
}
</script>
