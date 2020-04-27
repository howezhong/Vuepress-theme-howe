<template>
  <header class="z-header-wrapper" v-if="isFold">
    <span class="iconfont icon-menu-open" @click="openSidebar"></span>
    <span class="iconfont icon-drop" v-if="isHide" @click="onDropDown"></span>
  </header>
</template>
<script>
export default {
  name: 'ZHeader',
  props: { isFold: Boolean },
  computed: {
    isHide () {
      return this.$route.path !== '/contact/'
    }
  },
  methods: {
    openSidebar () {
      this.$emit('toggle-sidebar', true);
    },
    onDropDown () {
      this.$emit('on-drop-down');
    }
  }
};
</script>
