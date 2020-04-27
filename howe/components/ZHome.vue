<template>
  <div class='z-home-wrapper' :style="styles">
    <div class="inner">
      <z-svg class="w100" :content="synopsis"></z-svg>
      <a v-if="btnTitle" class="btn btn-success" :href="`${$site.base}post/`">{{btnTitle}}</a>
    </div>
  </div>
</template>
<script>
import ZSvg from '@theme/components/ZSvg.vue'

export default {
  name: 'ZHome',
  components: { ZSvg },
  computed: {
    styles() {
      return `background-image: url(${require('@/assets/sky.jpg')})`
    },
    synopsis() {
      return this.$page.frontmatter.tagline || this.$description || 'Welcome to visit'
    },
    btnTitle() {
      return this.$page.frontmatter.heroText || this.$title || ''
    }
  }
}
</script>
