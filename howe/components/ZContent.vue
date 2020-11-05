<template>
  <div class="z-content-wrapper">
    <zContents :class="isUnfold&&'open'" @click.native="onDropDown" />
    <div class="contents" :class="contents&&'is-left'">
      <div class="contents-head">
        <h2 class="title">{{$frontmatter.title}}</h2>
      </div>
      <Content class="howe-content" />
      <footer class="page-edit">
        <div class="edit-link" v-if="editLink">
          <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
          <OutboundLink />
        </div>
        <div class="update-time">
          <span>{{ publishUpdatedText }}</span>
          <span class="time">{{ publishUpdated }}</span>
          <template v-if="lastUpdated">
            <span class="prefix-last">{{ lastUpdatedText }}</span>
            <span class="time">{{ lastUpdated }}</span>
          </template>
        </div>
      </footer>
      <div class="page-nav" v-if="prev || next">
        <div class="inner">
          <p v-if="prev" class="prev">
            <span>上一篇：</span>
            <a v-if="prev" :href="base + prev.path">{{ prev.title || prev.path }}</a>
          </p>
          <p v-if="next" class="next">
            <span>下一篇：</span>
            <a v-if="next" :href="base + next.path">{{ next.title || next.path }}</a>
          </p>
        </div>
      </div>
      <zValine class="z-valine" />
    </div>
  </div>
</template>
<script>
import { FormatDate, DateFormat } from '@/utils/tools'
import { resolveSidebarItems } from '@/utils'
import ZContents from '@theme/components/ZContents.vue'
import ZValine from '@theme/components/ZValine.vue'

export default {
  name: 'ZContent',
  props: { isUnfold: Boolean },
  components: { ZContents, ZValine },
  computed: {
    base() {
      const base = this.$site.base
      return base ? base.substring(0, base.length - 1) : ''
    },
    contents () {
      let lists = this.$page.headers || []
      return lists.length > 0
    },
    publishUpdated () {
      return FormatDate(this.$frontmatter.date)
    },
    lastUpdated () {
      if (this.$page.lastUpdated) return DateFormat(this.$page.lastUpdated, '-')
      else if (this.$frontmatter.update_date) return FormatDate(this.$frontmatter.update_date)
    },
    publishUpdatedText () {
      if (typeof this.$themeLocaleConfig.publishUpdated === 'string') {
        return this.$themeLocaleConfig.publishUpdated
      }
      if (typeof this.$site.themeConfig.publishUpdated === 'string') {
        return this.$site.themeConfig.publishUpdated
      }
      return 'publish Updated'
    },
    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },
    editLink () {
      if (this.$page.frontmatter.editLink === false) return
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, this.$page.relativePath)
      }
    },
    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText
        || this.$site.themeConfig.editLinkText
        || `Edit this page`
      )
    },
    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },
    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page.regularPath,
        this.$site
      )
    }
  },
  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '')
          + `/src`
          + `/${docsBranch}/`
          + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
          + path
          + `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '')
        + `/edit`
        + `/${docsBranch}/`
        + (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '')
        + path
      )
    },
    onDropDown () {
      this.$emit('on-drop-down');
    }
  }
}
function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/component/zContent.scss';
</style>
