// 将会话时间戳转为时间
export function timestampToDate(timestamp: number): string {
  const now = new Date() // 当前时间
  const date = new Date(timestamp) // 传入的时间戳

  // 计算时间差（单位：毫秒）
  const timeDiff = now.getTime() - date.getTime()

  // 转换为天数
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  // 判断时间差
  if (daysDiff === 0) {
    return '今天'
  } else if (daysDiff === 1) {
    return '昨天'
  } else if (daysDiff <= 7) {
    return '7天内'
  } else if (daysDiff <= 30) {
    return '30天内'
  } else if (daysDiff <= 365) {
    return '1年内'
  } else {
    return '历史'
  }
}
