<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 100" :width="width" :height="height">
    <defs>
      <linearGradient :id="idName" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" :style="{'stop-color':startColor}" />
        <stop offset="75%" :style="{'stop-color':endColor}" />
      </linearGradient>
    </defs>
    <text :class="classes" :font-size="fontSize" :text-anchor="textAnchor" :x="textX" y="50%" dy=".35em">{{content}}</text>
  </svg>
</template>
<script>
export default {
  name: 'ZSvg',
  props: {
    idName: {
      type: String,
      default: 'content'
    },
    width: {
      type: Number,
      default: 660
    },
    height: {
      type: Number,
      default: 120
    },
    fontSize: {
      type: Number,
      default: 38
    },
    startColor: {
      type: String,
      default: '#ffecc8'
    },
    endColor: {
      type: String,
      default: '#ffc37a'
    },
    content: String,
    classes: {
      type: String,
      default: 'gradient'
    },
    textAnchor: {
      type: String,
      default: 'middle'
    },
    textX: {
      type: String,
      default: '50%'
    }
  }
}
</script>
<style lang='scss' scoped>
.gradient {
  fill: url('#content');
  font-weight: 500;
}
</style>
