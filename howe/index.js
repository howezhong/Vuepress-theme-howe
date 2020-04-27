const path = require('path')

module.exports = (options, ctx) => {
  const { themeConfig, siteConfig, sourceDir } = ctx

  const isAlgoliaSearch = (
    themeConfig.algolia || Object
      .keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].algolia)
  )

  return {
    // 可以添加指定页面渲染路由, 不加文件夹下必需得有README.md, 否则会是404页面,
    // 但是这种方式下建README.md会无效
    // async ready () {
    //   ctx.addPage({
    //     path: '/contact/',
    //   })
    // },
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
