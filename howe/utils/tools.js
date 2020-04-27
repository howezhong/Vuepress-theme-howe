/**
 * 查找目标元素, 存在返回下标, 不存在返回-1
 * @param {Array} arr 数组元素
 * @param {String, Number} elem
 */
export const isHave = (arr, elem) => {
  return arr.indexOf(item => item === elem)
}

/**
 * 遍历
 * @param {Array} arr 数组
 * @param {Function} fn 回调函数
 */
export const ForEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {String} time 日期
 * @returns {Number}
 */
export const GetTimestamp = time => {
  return (new Date(time)).getTime()
}

/**
 * 格式化时间/获取时间
 * @param {Number/empty} timestamp 时间
 * @return {Object}
 */
export const DateFormat = (timestamp = '', joiner = '') => {
  const strTime = timestamp ? new Date(timestamp) : new Date()
  const year = strTime.getFullYear()
  const month = zero(strTime.getMonth() + 1)
  const date = zero(strTime.getDate())
  const hours = zero(strTime.getHours())
  const minutes = zero(strTime.getMinutes())
  const seconds = zero(strTime.getSeconds())
  if (joiner) {
    return `${year}${joiner}${zero(month)}${joiner}${zero(date)} ${hours}:${minutes}:${seconds}`
  } else {
    return { year, month, date, hours, minutes, seconds }
  }
}

/**
 * 格式化时间
 * @param {Number/empty} timestamp 时间
 * @param {String} joiner 连接符
 */
export const FormatDate = (timestamp, joiner = '-') => {
  const strTime = new Date(timestamp)
  const y = strTime.getFullYear()
  const m = strTime.getMonth() + 1
  const d = strTime.getDate()
  return `${y}${joiner}${zero(m)}${joiner}${zero(d)}`
}

// 补零
export const zero = date => {
  return date < 10 ? `0${date}` : date
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(item => arr.indexOf(item) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * 数组重组, 对重复元素进行叠加
 * @param {Array} arr 元数组
 * @param {String} key 键名
 */
export function Distinct(arr, key) {
  if (!arr || arr.length === 0) return []
  let res = []
  let obj = {}
  for (let i of arr) {
    if (!obj[i]) {
      res.push({ [key]: i, num: 1 })
      obj[i] = i
    } else {
      let idx = res.findIndex(item => item[key] === i)
      res[idx].num++
    }
  }
  return res
}

/**
 * 数组重组, 对重复元素进行叠加
 * @param {Array} arr 元数组
 * @param {String} key 键名
 * @param {String} key2 键名
 */
export function DistinctObj(arr, key, key2) {
  let res = []
  let obj = {}
  let name = null
  for (let i of arr) {
    name = i[key].toString() + i[key2].toString()
    if (!obj[name]) {
      res.push(i)
      obj[name] = name
    } else {
      let idx = res.findIndex(item => parseInt(item[key]) === parseInt(i[key]) && parseInt(item[key2]) === parseInt(i[key2]))
      res[idx].num++
    }
  }
  return res
}

/**
 * 本地存储
 * @param {String} key 键
 * @param {any} value 值
 */
export const storeSet = (key, value) => {
  if (!key || typeof key !== 'string') return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

/**
* 获取
* @param {String} key 键
*/
export const storeGet = key => {
  if (!key || typeof key !== 'string') return
  let val = window.sessionStorage.getItem(key)
  return val && JSON.parse(val)
}

/**
 * 删除
 * @param {String} key 键
 */
export const storeRemove = key => {
  if (!key) return
  if (Array.isArray(key) && key.length !== 0) {
    forEach(key, res => {
      window.sessionStorage.removeItem(res)
    })
  }
  if (typeof key === 'string') {
    window.sessionStorage.removeItem(key)
  }
}
