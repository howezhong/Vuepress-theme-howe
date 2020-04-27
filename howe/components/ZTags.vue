<template>
  <div class="post-tags">
    <h2 class="post-archives-title">分类</h2>
    <ul class="post-tags-item">
      <li class="post-tags-all" @click="handleClick">全部</li>
      <li v-for="(item, i) in tags" :key="i" @click="handleClick(item.name, 'tags')" :style="getRandomColor()">{{item.name}}<span class="num">({{item.num}})</span></li>
    </ul>
  </div>
</template>
<script>
import { ForEach, Distinct } from '@/utils/tools'

export default {
  name: 'ZTags',
  computed: {
    tags() {
      let _tags = []
      let pages = this.$site.pages
      if (!pages || pages.length === 0) return _tags
      ForEach(pages, page => {
        const { isHide, tags } = page.frontmatter
        if (!tags || isHide) return
        _tags.push(...tags)
      })
      return Distinct(_tags, 'name')
    }
  },
  methods: {
    handleClick(options = '', type = ''){
      this.$emit('on-click', options, type)
    },
    /**
     * 生成随机颜色值
     */
    getRandomColor() {
      const rgb = []
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length === 1 ? '0' + color : color
        rgb.push(color)
      }
      return `background-color: #${rgb.join('')}`
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~@/variable";
.post-tags {
  width: 100%;
  height: auto;
  padding: 15px;
  margin-top: 10px;
  background-color: #fff;
  box-sizing: border-box;
}
.post-tags-item {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-right: -10px;
  li {
    display: inline-flex;
    color: #fff;
    font-size: 16px;
    padding: 1px 0.6rem;
    margin: 5px;
    border-radius: 2px;
    cursor: pointer;
    box-sizing: border-box;
    .num {
      padding-left: 5px;
    }
    &:hover {
      transform: scale(1.15);
    }
  }
}
.post-tags-all {
  background-color: $theme;
}
.post-tags-item li,
.post-list-tag {
  transition: all 0.3s ease-in-out;
}
</style>
