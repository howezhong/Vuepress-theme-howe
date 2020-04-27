<template>
  <aside class="z-sidebar-wrapper">
    <section class="z-sidebar-logo">
      <router-link :to="$localePath" @click.native="onClick">
        <img class="avatar" v-if="isLogo" :src="$withBase(isLogo)" />
        <z-logo v-else></z-logo>
      </router-link>
    </section>
    <z-nav @click.native="onClick"></z-nav>
  </aside>
</template>
<script>
import zLogo from '@theme/components/zLogo.vue'
import ZNav from '@theme/components/ZNav'

export default {
  name: 'ZSidebar',
  components: { ZNav, zLogo },
  computed: {
    isLogo () {
      return this.$site.themeConfig.logo
    }
  },
  methods: {
    onClick () {
      this.$emit('on-click', false)
    }
  }
}
</script>
