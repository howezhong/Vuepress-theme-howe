import './styles/index.scss'
import * as filters from './utils/filters'

/**
 * @param { Function } Vue VuePress 正在使用的 Vue 构造函数
 * @param { Object } options 附加到根实例的一些选项
 * @param { Object } router 当前应用的路由实例
 * @param { Object } siteData 站点元数据
 */
export default ({ Vue, options, router, siteData }) => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
  Vue.mixin({
    computed: {
      $userInfo() {
        return Object.assign({}, siteData.themeConfig.userInfo)
      }
    }
  })
}

console.log(
  '\n%c作者: %c 稻香 %c主题: %c howe \n',
  'background: #00adb5;padding: 10px 0 8px 10px;font-size: 14px;',
  'background: rgba(207, 174, 249, 0.3);padding: 10px 0 8px;font-size: 14px;color:#00adb5;',
  'background: #00adb5;padding: 10px 0 8px 10px;font-size: 14px;',
  'background: rgba(207, 174, 249, 0.3);padding: 10px 0 8px;font-size: 14px;color:#00adb5;'
)
