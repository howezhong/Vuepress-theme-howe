const path = require('path')
const secret = require('./secret')

module.exports = {
  base: '/howe/', // 设置站点根路径 (default /) 代码部署到github后要改, 如github.io/howe/(base: '/howe/') 注意：base 属性的值总是以 / 开始并以 / 结束
  title: '稻香',
  description: '对未来最大的慷慨是把一切献给现在！',
  dest: './dist', // 设置输出目录
  port: 2020, // 端口
  head: [
    ['meta', { name: 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
    ['meta', { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' }],
    ['meta', { name: 'author', content: '稻香' }],
    ['meta', { name: 'keywords', content: '稻香|博客|howe|vuepress|zhonghw|对未来最大的慷慨是把一切献给现在！' }],
    ['meta', { name: 'theme-color', content: '#00adb5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ['link', { rel: 'icon', href: `/farvirate.png` }]
  ],
  markdown: {
    // 是否在每个代码块的左侧显示行号
    lineNumbers: false
  },
  theme: path.resolve(__dirname, '../../howe'),
  themeConfig: {
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    publishUpdated: '发表于',
    lastUpdated: '最后更新于',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/post/' },
      { text: '导航', link: '/navigate/' },
      { text: '留言', link: '/contact/' }
    ],
    userInfo: {
      nickname: '稻香',
      job: '前端',
      address: '厦门',
      links: [
        { name: 'Github', url: 'https://github.com/howezhong' },
        { name: '掘金', url: 'https://juejin.im/user/5aaa3302518825188038a8e9' }
      ]
    },
    valine: secret
  }
}
