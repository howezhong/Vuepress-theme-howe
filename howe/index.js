const path = require('path')
const fs = require('fs-extra')

module.exports = (options, ctx) => {
  const { themeConfig, siteConfig, sourceDir, writeTemp } = ctx

  const isAlgoliaSearch = (
    themeConfig.algolia || Object
      .keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].algolia)
  )
  return {
    async ready () {
      // 可以添加指定页面渲染路由, 不加文件夹下必需得有README.md, 否则会是404页面, 但是这种方式下建README.md会无效
      // ctx.addPage({
      //   path: '/contact/',
      // })
      const userPalette = path.resolve(sourceDir, '.vuepress/styles/variable.scss')
      console.log(userPalette)
      const userPaletteContent = fs.existsSync(userPalette)
        ? `@import ${JSON.stringify(userPalette.replace(/[\\]+/g, '/'))};`
        : ''

      // user's variable can override theme's variable.
      let paletteContent = '// User\'s variable\n' + (userPaletteContent || '// null')

      await writeTemp('variable.scss', paletteContent)
    },
    additionalPages: [
      { path: '/post/' },
      { path: '/navigate/' },
      { path: '/contact/' }
    ],
    alias () {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js'),
        '@': path.resolve(__dirname, './'),
        '~@': path.resolve(__dirname, './styles'),
        '~@mi': path.resolve(sourceDir, '.vuepress/styles')
      }
    },
    extensions () {
      return ['.css', '.scss']
    },
    // clientRootMixin: path.resolve(__dirname, 'mixins/resizeMixin.js'),
    plugins: [
      ['@vuepress/search', {
        searchMaxSuggestions: 10
      }],
      ['@vuepress/last-updated', {
        transformer: (timestamp, lang) => {
          return timestamp
        }
      }],
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }]
    ]
  }
}
