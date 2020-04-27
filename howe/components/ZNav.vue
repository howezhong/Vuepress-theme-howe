<template>
  <nav class="z-nav-wrapper" v-if="userLinks.length">
    <div class="z-nav-item" v-for="item in userLinks" :key="item.link">
      <RouterLink class="z-nav-link" :class="isActive(item)&&'active'" :to="item.link" :exact="exact" @focusout.native="focusoutAction">{{ item.text }}</RouterLink>
    </div>
  </nav>
</template>
<script>
import { resolveNavLinkItem } from '@/utils';
import { isHave } from '@/utils/tools'

export default {
  name: 'ZNav',
  computed: {
    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        });
      });
    },

    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },

    nav () {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || 'Languages',
          ariaLabel: this.$themeLocaleConfig.ariaLabel || 'Select language',
          items: Object.keys(locales).map(path => {
            const locale = locales[path];
            const text = (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          })
        };
        return [...this.userNav, languageDropdown];
      }
      return this.userNav;
    },

    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);
      }
      return this.link === '/';
    }
  },
  methods: {
    focusoutAction () {
      this.$emit('focusout');
    },
    isActive (name) {
      let urls = this.$route.path.split('/')
      let link = name.link.replace(/\//g, '')
      if (!link) return
      else return urls.indexOf(link) > -1
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@/variable';
.z-nav-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
}
.z-nav-item {
  font-size: 1.2rem;
  height: 3rem;
  line-height: 3rem;
}
.z-nav-link {
  display: block;
  color: $sidebar-color;
  transition: all 0.3s ease-in-out;
  &:hover,
  &.active {
    color: $theme;
    background-color: $sidebar-color-hover;
  }
}
</style>
