<template>
  <main class="z-contact-wrapper">
    <!-- <figure class="rear-banner" :style="style"></figure> -->
    <div class="inner">
      <div class="z-userinfo">
        <p><span>佚名：</span>{{userInfo.nickname}}</p>
        <p><span>职业：</span>{{userInfo.job}}</p>
        <p><span>坐标：</span>{{userInfo.address}}</p>
        <nav class="outer-chain">
          <a class="outer-chain-item" v-for="(item, i) in userInfo.links" :key="i" :href="item.url" target="_blank">{{item.name}}</a>
        </nav>
      </div>
      <div class="valine-container">
        <z-valine></z-valine>
      </div>
    </div>
  </main>
</template>
<script>
import ZValine from '@theme/components/ZValine.vue'

export default {
  name: 'ZContact',
  components: { ZValine },
  computed: {
    userInfo () {
      return this.$userInfo
    }
    // style () {
    //   return ''
    //   // return `background-image: url(${require('@/assets/bicycle.jpg')})`
    // }
  },
}
</script>
