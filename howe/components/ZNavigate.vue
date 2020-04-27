<template>
  <div class='z-navigate-container'>
    <ZTabBar class="z-tabbar" :navs="navs" :is-unfold="isUnfold" :is-active="isActive" @on-select="linkToAnchor" />
    <section class="z-navigate-content">
      <div class="z-panel-wrapper" v-for="(item, i) in bookmark" :key="`a${i}`">
        <h2 class="title">{{item.title}}</h2>
        <div class="panel-item">
          <p v-if="item.books.length === 0" class="panel-empty">空空如也~</p>
          <a v-else class="panel-cell" :href="item.link" v-for="(item, idx) in item.books" target="_blank" :key="`b${idx}`">
            <span class="link-title">{{item.title}}</span>
            <span class="link-desc">{{item.desc}}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ForEach, isHave } from '@/utils/tools'
import ZTabBar from '@theme/components/ZTabBar'

export default {
  name: 'ZNavigate',
  props: { isUnfold: Boolean },
  components: { ZTabBar },
  data () {
    return {
      offsetTop: [],
      isActive: 0
    }
  },
  computed: {
    bookmark () {
      let arrs = []
      ForEach(this.$site.pages, item => item.frontmatter.bookmark && arrs.push(item.frontmatter))
      return arrs.sort((a, b) => a.level - b.level)
    },
    navs () {
      let arrs = []
      ForEach(this.bookmark,item=> arrs.push(item.title))
      return arrs
    }
  },
  methods: {
    linkToAnchor ({ index }) {
      this.isActive = index
      this.$emit('on-select')
      window.scrollTo({
        top: this.offsetTop[index],
        behavior: "smooth"
      })
    },
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.offsetTop.some((item, i) => {
        this.scrollTop >= item && (this.isActive = i)
      })
    },
    debounce (fn, wait) {
      let timeout = null;
      return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      }
    }
  },
  mounted () {
    let height = document.querySelector('.z-tabbar').getBoundingClientRect().height
    let nodes = document.querySelectorAll('h2[class="title"]')
    ForEach(nodes, item => {
      this.offsetTop.push(item.getBoundingClientRect().top - height - 20)
    })
    window.addEventListener('scroll', this.debounce(this.handleScroll, 50), true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/component/zNavigate.scss';
</style>
