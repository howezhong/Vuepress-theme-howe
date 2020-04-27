<template>
  <aside class="z-contents-wrap" v-if="contents.length > 0">
    <ul>
      <li :class="['z-contents-link',classes(item, i),{'is-active':i===isActive}]" v-for="(item, i) in contents" :key="i">
        <a :id="`#${item.slug}`" :href="`#${item.slug}`">
          <span class="z-contents-sort" v-if="item.level===2">{{item.issue}}</span>
          <span class="z-contents-sort" v-else>{{item.issueVice}}</span>
          <span>{{item.title}}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>
<script>
import { ForEach } from '@/utils/tools'

export default {
  name: 'ZContents',
  data () {
    return {
      isActive: 0,
      offsetTop: [],
      scrollTop: 0
    }
  },
  computed: {
    contents () {
      let issue = 0
      let issueVice = 0
      let lists = this.$page.headers || []
      ForEach(lists, (item, i) => {
        if (item.level === 2) {
          issue++
          issueVice = 1
        } else {
          issueVice++
        }
        item.issue = issue
        item.issueVice = (issue === 0) ? issueVice : `${issue}.${issueVice}`
      })
      return lists
    }
  },
  watch: {
    $route (to, from) {
      this.initTitle()
    }
  },
  methods: {
    initTitle () {
      this.offsetTop = []
      this.isActive = 0
      // 获取二、三级菜单的top高度
      let doms = [...document.querySelectorAll('h2'), ...document.querySelectorAll('h3')]
      doms.forEach(item => this.offsetTop.push(item.offsetTop))
      window.addEventListener('scroll', this.debounce(this.handleScroll, 50), true)
    },
    handleScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.offsetTop.sort((a, b) => a - b)
      this.offsetTop.some((item, i) => {
        this.scrollTop >= item && (this.isActive = i)
      })
    },
    // 防抖
    debounce (fn, wait) {
      let timeout = null;
      return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
      }
    },
    classes (option, i) {
      if (i === 0) return
      if (option.issue !== 0) return `cloumn-${option.level}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initTitle()
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/variable';
.z-contents-wrap {
  position: sticky;
  top: $space;
  z-index: $header-zIndex;
  width: $width;
  max-height: calc(100vh - 2rem);
  font-size: 14px;
  padding: $space 0;
  background-color: #fff;
  border-radius: 5px;
  float: right;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  &.open {
    max-height: 100vh;
    padding: $space 0;
    box-shadow: none;
    overflow: scroll;
  }
}
.z-contents-link {
  padding: 0 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover,
  &.is-active {
    position: relative;
    background-color: rgba(207, 174, 249, 0.3);
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 100%;
      background-color: $theme;
    }
  }
  & > a {
    position: relative;
    display: block;
    padding: 5px 0;
    color: #333;
    font-size: 14px;
    transition: all 0.3s;
    span:first-of-type {
      padding-right: 0.2em;
    }
  }
}
.cloumn-3 {
  padding-left: 2.8em;
}
</style>
