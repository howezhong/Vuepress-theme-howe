<template>
  <div class='z-post-wrapper'>
    <div class="z-post-body">
      <ZTabBar class="z-tabbar" :navs="navs" :is-unfold="isUnfold" :is-active="isActive" @on-select="linkToAnchor" />
      <div class="aside-wrap">
        <z-archives @on-click="getPosts" />
        <z-tags @on-click="getPosts" />
      </div>
      <div class="z-post-content">
        <div class="z-post-list" v-for="(item, i) in posts" :key="i">
          <a class="z-post-title" :href="item.path" @click="linkToDesc(item.frontmatter)">{{item.frontmatter.title}}</a>
          <div class="z-post-info">
            <div class="cell">
              <span class="iconfont icon-date"></span>
              <span class="date">{{item.frontmatter.date}}</span>
            </div>
            <div class="cell">
              <span class="iconfont icon-category"></span>
              <span class="cell-hover" @click="getPosts(item.frontmatter.category, 'category')">{{item.frontmatter.category}}</span>
            </div>
            <div class="post-list-tag" v-if="item.frontmatter.tags&&item.frontmatter.tags.length">
              <span class="iconfont icon-tags"></span>
              <span class="cell-hover" v-for="(tag, i) in item.frontmatter.tags" @click="getPosts(tag, 'tags')" :key="i">{{tag}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ForEach, isHave, FormatDate, DateFormat, GetTimestamp, storeSet } from '@/utils/tools'
import ZArchives from '@theme/components/ZArchives'
import ZTags from '@theme/components/ZTags'
import ZTabBar from '@theme/components/ZTabBar'

export default {
  name: 'ZPosts',
  props: { isUnfold: Boolean },
  components: { ZArchives, ZTags, ZTabBar },
  data () {
    return {
      posts: [],
      isActive: 0
    }
  },
  computed: {
    navs () {
      let arrs = ['全部']
      ForEach(this.getArticle, item => {
        const { category } = item.frontmatter
        category && !arrs.includes(category) && arrs.push(category)
      })
      let index = arrs.findIndex(item => item === '其它' || item === 'other' || item === 'Other')
      let _arrs = index > -1 ? arrs.splice(index, 1) : []
      return [...arrs, ..._arrs]
    },
    getArticle () {
      return this.$site.pages.filter(page => {
        const { isHide, date } = page.frontmatter
        if (isHide || !date) return
        const str = this.$site.base
        page.path = str ? str.substring(str, str.length - 1) + page.path :page.path
        return page
      })
    }
  },
  methods: {
    getPosts (options = '', key = '') {
      let pages = this.getArticle
      if (!pages || pages.length === 0) return []
      pages.sort((next, prev) => GetTimestamp(prev.frontmatter.date) - GetTimestamp(next.frontmatter.date))
      this.posts = pages.filter(page => {
        const { date, tags, category } = page.frontmatter
        if (!key) {
          return page.frontmatter.date = FormatDate(date)
        } else if (key === 'date') {
          const { year, month } = DateFormat(date)
          return year === options.year && month === options.month
        } else if (key === 'tags') {
          return (tags || []).findIndex(item => item.toUpperCase() == options.toUpperCase()) > -1
        } else if (key === 'category') {
          return category === options
        }
      })
    },
    linkToAnchor ({ index, site }) {
      this.isActive = index
      this.$emit('on-select')
      this.getPosts(site, index === 0 ? '' : 'category')
    },
    linkToDesc (option) {
      storeSet('key_head_info', option)
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
