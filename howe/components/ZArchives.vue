<template>
  <div class="post-archives">
    <h2 class="post-archives-title">档案馆</h2>
    <ul class="post-archives-list">
      <li @click="handleClick" @mouseenter="mouseenter(0)" @mouseleave="mouseleave">
        <span class="date">全部博文</span>
        <span class="num">{{lists.length}}</span>
      </li>
      <li v-for="(item, i) in dates" @click="handleClick(item, 'date', i+1)" @mouseenter="mouseenter(i+1)" @mouseleave="mouseleave" :key="i">
        <span class="date">{{item.year}}年{{item.month}}月</span>
        <span class="num">{{item.num}}</span>
      </li>
      <li class="slider" :style="`top: ${offsetY}px`"></li>
    </ul>
  </div>
</template>
<script>
import { ForEach, GetTimestamp, DateFormat, DistinctObj } from '@/utils/tools'

export default {
  name: 'zArchives',
  data () {
    return {
      lists: [],
      offsetY: 0,
      currIdx: 0
    }
  },
  computed: {
    dates() {
      let pages = this.$site.pages
      if (!pages || pages.length === 0) return this.lists
      ForEach(pages, page => {
        const { isHide, date } = page.frontmatter
        if (!date || isHide) return
        this.lists.push({
          date: date,
          year: DateFormat(date).year,
          month: DateFormat(date).month,
          num: 1
        })
      })
      this.lists.sort((a, b) => GetTimestamp(b.date) - GetTimestamp(a.date))
      return DistinctObj(this.lists, 'year', 'month')
    },
  },
  methods: {
    handleClick(options = '', type = '', i = 0){
      this.currIdx = i
      this.mouseenter(i)
      this.$emit('on-click', options, type)
    },
    mouseenter(i){
      this.offsetY = i * 30
    },
    mouseleave() {
      this.mouseenter(this.currIdx)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~@/variable";
.post-archives {
  width: 100%;
  height: auto;
  padding: 15px 0;
  background-color: #fff;
  box-sizing: border-box;
}
.post-archives-title {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 5px;
}
.post-archives-list {
  position: relative;
  overflow: hidden;
  li {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    cursor: pointer;
    box-sizing: border-box;
  }
  .slider {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 0;
    background-color: rgba(207, 174, 249, 0.3);
    border-left: 4px solid $theme;
    transition: top 0.3s ease;
  }
  .date {
    color: #4a4a4a;
    cursor: pointer;
    &:hover {
      color: $theme;
    }
  }
  .date,
  .num {
    font-size: 16px;
    box-sizing: border-box;
  }
  .num {
    color: $home-font-linear;
    font-weight: 700;
  }
}

</style>
