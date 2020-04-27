export const DateToYearMonth = date => {
  const strTime = new Date(date)
  const y = strTime.getFullYear()
  const m = strTime.getMonth() + 1
  return `${y}年${zero(m)}月`
}
// 补零
export const zero = date => {
  return date < 10 ? `0${date}` : date
}
