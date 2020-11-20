<template>
  <div class='z-main-wrapper' :class="isOpenSidebar?'is-open-sidebar':'is-close-sidebar'">
    <z-header :is-fold="isMobile" @toggle-sidebar="toggleSidebar" @on-drop-down="onDropDown"></z-header>
    <z-sidebar @on-click="toggleSidebar"></z-sidebar>
    <ClientOnly>
      <z-post class="space-left" v-if="isPost" :is-unfold="isUnfold"></z-post>
      <z-navigate class="space-left" v-else-if="isNavigate" :is-unfold="isUnfold" @on-select="onDropDown"></z-navigate>
      <z-contact class="space-left" v-else-if="isContact"></z-contact>
      <z-content class="space-left" v-else :is-unfold="isUnfold" @on-drop-down="onDropDown"></z-content>
    </ClientOnly>
    <div class="popup-cover" v-if="isOpenSidebar" @click="toggleSidebar"></div>
  </div>
</template>
<script>
import ZHeader from '@theme/components/ZHeader';
import ZSidebar from '@theme/components/ZSidebar';
import ZPost from '@theme/components/ZPost.vue'
import ZNavigate from '@theme/components/ZNavigate.vue'
import ZContact from '@theme/components/ZContact.vue'
import ZContent from '@theme/components/ZContent.vue'

export default {
  name: 'ZMain',
  components: { ZHeader, ZSidebar, ZPost, ZNavigate, ZContact, ZContent },
  props: { isMobile: Boolean },
  data () {
    return {
      isUnfold: false,
      isOpenSidebar: false
    }
  },
  computed: {
    isPost () {
      return this.$route.path === '/post/'
    },
    isNavigate () {
      return this.$route.path === '/navigate/'
    },
    isContact () {
      return this.$route.path === '/contact/'
    }
  },
  methods: {
    toggleSidebar (to) {
      if (!this.isMobile) return
      this.isOpenSidebar = !this.isOpenSidebar
    },
    onDropDown (e) {
      this.isUnfold = !this.isUnfold
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/styles/variable';
.z-main-wrapper {
  background-color: $main-bg-color;
  transition: all 0.3s ease;
}
.popup-cover {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $header-zIndex;
  width: 100%;
  height: 100%;
  background-color: $popup-bg-color;
}
@media screen and (max-width: $md) {
  .space-left {
    margin-left: 0;
  }
}
</style>
