<template>
  <nav class='z-tabbar' :class="[isUnfold&&'open',isFold&&isDrop&&'is-down']">
    <ul class="z-nav-wrap">
      <li class="z-nav-cell" v-for="(item, i) in navs" :key="`s${i}`" @click="selected(i,item)">
        <a :class="['z-nav-link', isActive===i&&'is-active']" :href="isHref?`#${item}`:'javascript:;'">{{item}}</a>
      </li>
    </ul>
    <span v-if="isDrop" class="iconfont icon-drop is-drop" @click="handleDropDown"></span>
  </nav>
</template>
<script>
import resizeMixin from '@theme/mixins/resizeMixin';
import { ForEach } from '@/utils/tools'

export default {
  name: 'ZTabBar',
  mixins: [resizeMixin],
  props: {
    navs: {
      type: Array,
      default: () => []
    },
    isActive: {
      type: Number,
      default: 0
    },
    isUnfold: Boolean,
    isHref: Boolean
  },
  data () {
    return {
      navsTotalWidth: 0,
      isDrop: false,
      isFold: false
    }
  },
  methods: {
    selected (i, option) {
      this.$emit('on-select', {
        index: i,
        site: option
      })
      this.isFold = false
    },
    handleDropDown () {
      this.isFold = !this.isFold
    },
    changeResize () {
      let navNode = document.querySelector('.z-nav-wrap')
      if (!navNode) return false
      this.pixels = window.innerWidth || document.body.clientWidth
      if (this.navsTotalWidth > navNode.getBoundingClientRect().width) {
        this.isDrop = true
      } else {
        this.isDrop = false
      }
    }
  },
  mounted () {
    let navs = document.querySelectorAll('.z-nav-cell')
    ForEach(navs, item => {
      this.navsTotalWidth += item.getBoundingClientRect().width
    })
    this.changeResize()
  }
}
</script>
<style lang='scss' scoped>
@import '~@/variable';
.z-tabbar {
  position: fixed;
  top: 0;
  left: $sidebar-width;
  z-index: $header-zIndex;
  width: calc(100% - #{$sidebar-width});
  max-height: $header-height;
  padding: 0 var(--space);
  background-color: #fff;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  box-sizing: border-box;
  --space: 1rem;
  &.is-down {
    max-height: 100vh;
  }
  & > ul {
    li {
      display: inline-block;
      vertical-align: middle;
      height: $header-height;
      line-height: $header-height;
      text-align: center;
    }
  }
  .z-nav-link {
    display: block;
    padding: 0 var(--space);
    color: $sidebar-color;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    transition: all 0.3s ease;
    box-sizing: border-box;
    &.is-active,
    &:hover {
      color: $theme;
      background-color: $content-color-hover;
    }
  }
  .icon-drop {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 28px;
    color: $sidebar-color;
    padding: var(--space);
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: $theme;
    }
  }
}
.is-mobile {
  .z-tabbar {
    top: $header-height;
    left: 0;
    width: 100%;
    height: auto;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
    box-shadow: $header-box-shadow;
    overflow: hidden;
    & > ul {
      padding: 0;
      li {
        min-width: 25%;
        height: $header-height - $space;
        line-height: $header-height - $space;
      }
    }
    .z-nav-link {
      font-size: 14px;
      padding: 0 $space;
    }
    &.open {
      max-height: 100vh;
    }
  }
  .is-drop {
    display: none;
  }
}
</style>
