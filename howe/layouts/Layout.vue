<template>
  <section class="layout-wrapper" :class="isSidebarOpen?'is-mobile':'is-open'" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <z-home v-if="isHome"></z-home>
    <z-main v-else :is-mobile="isMobile"></z-main>
  </section>
</template>

<script>
import ZHome from '@theme/components/ZHome';
import ZMain from '@theme/layouts/ZMain';
import resizeMixin from '@theme/mixins/resizeMixin';

export default {
  name: 'Layout',
  mixins: [resizeMixin],
  components: { ZHome, ZMain },
  data () {
    return {
      isSidebarOpen: false,
      isMobile: false
    }
  },
  computed: {
    isHome () {
      return this.$route.path === '/'
    }
  },
  watch: {
    pixels (n, o) {
      this.isMobile = this.isSidebarOpen = n <= 768
    }
  },
  methods: {
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
    toggleSidebar (to) {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  },
  provide () {
    return {
      mobile: this.$data
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/variable';
.layout-wrapper {
  height: 100%;
  background-color: $main-bj-color;
}
</style>
