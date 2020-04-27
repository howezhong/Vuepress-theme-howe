<template>
  <div class='z-home-wrapper' :style="styles">
    <div class="inner">
      <z-svg class="w100" :content="synopsis"></z-svg>
      <a v-if="btnTitle" class="btn btn-success" href="/post/">{{btnTitle}}</a>
    </div>
  </div>
</template>
<script>
import ZSvg from '@theme/components/ZSvg.vue'

export default {
  name: 'ZHome',
  components: { ZSvg },
  data() {
    return {
      datas: null
    }
  },
  computed: {
    styles() {
      return `background-image: url(${require('@/assets/sky.jpg')})`
    },
    synopsis() {
      return this.datas && this.datas.tagline || this.$description || 'Welcome to visit'
    },
    btnTitle() {
      return this.datas && this.datas.heroText || this.$title || ''
    }
  },
  mounted() {
    this.datas = this.$page.frontmatter
  }
}
</script>
