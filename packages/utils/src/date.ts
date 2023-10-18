/**
 * 获取当前年份
 * @returns 返回当前年份
 */
const getCurrentYear = (): number => {
  const date = new Date()
  return date.getFullYear()
}

/**
 * 获取当前月份
 * @returns 返回当前月份（不用额外加1）
 */
const getCurrentMonth = (): number => {
  const date = new Date()
  return date.getMonth() + 1
}
/**
 * 获取指定月份天数
 * js中0是一月，11是12月，
 * 当传入实际月份后， date.setMonth(month);是将月份设置为下一个月，
 * date.setDate(0)，是将日期设置为上个月最后一天
 * @param month 月份
 * @returns
 */
const getDaysOfMonth = (month: number): number => {
  const date = new Date()
  date.setMonth(month)
  date.setDate(0)
  const days = date.getDate()
  return days
}

type ZlDay = {
  month: number
  day: number
}

/**
 *
 * 获取日期选择框展示的日期
 * @param year 年
 * @param month 月
 * @param isStartMon 每周第一天是否是周一
 * @returns
 */
const getMonthPage = (year: number, month: number, isStartMon: boolean): ZlDay[] => {
  const dates: ZlDay[] = []
  const date = new Date()
  date.setFullYear(year)
  date.setMonth(month - 1)
  date.setDate(1)
  // 获取当月第一天是星期几
  // 此处将周日处理成7方便处理
  const week = date.getDay() === 0 ? 7 : date.getDay()
  let isNeedStartDay: boolean = false
  if ((isStartMon && week != 1) || (!isStartMon && week != 7)) {
    isNeedStartDay = true
  }
  let index = 0
  if (isNeedStartDay) {
    date.setDate(0)
    const days = date.getDate()
    if (isStartMon) {
      for (let i = days - (week - 1) + 1; i <= days; i++, index++) {
        dates[index] = {
          month: month - 1,
          day: i
        }
      }
    } else {
      for (let i = days - week + 1; i <= days; i++, index++) {
        dates[index] = {
          month: month - 1,
          day: i
        }
      }
    }
  }
  // 获取本月天数
  date.setMonth(month)
  date.setDate(0)
  const currentDays = date.getDate()
  for (let i = 0; i < currentDays; i++, index++) {
    dates[index] = {
      month: month,
      day: i + 1
    }
  }
  const endWeek = date.getDay()
  let isNeedEndDay: boolean = false
  if ((isStartMon && endWeek !== 7) || (!isStartMon && endWeek !== 6)) {
    isNeedEndDay = true
  }
  if (isNeedEndDay) {
    if (isStartMon) {
      for (let i = 0; i < 7 - endWeek; i++, index++) {
        dates[index] = {
          month: month + 1,
          day: i + 1
        }
      }
    } else {
      for (let i = 0; i < 7 - endWeek - 1; i++, index++) {
        dates[index] = {
          month: month + 1,
          day: i + 1
        }
      }
    }
  }
  return dates
}

/**
 * 日期格式化
 * @param date 需要格式化的日期
 * @param patern 日期格式（yyyy-年,MM-月，dd-日，HH-24h,hh-12h, mm-分，ss-秒）
 */
const formater = (date: Date, pattern: string): string => {
  let result = pattern
    .replace('yyyy', date.getFullYear().toString())
    .replace(
      'MM',
      date.getMonth().toString().length > 1
        ? date.getMonth().toString()
        : '0' + date.getMonth().toString()
    )
    .replace(
      'dd',
      date.getDate().toString().length > 1
        ? date.getDate().toString()
        : '0' + date.getDate().toString()
    )
    .replace(
      'mm',
      date.getMinutes().toString().length > 1
        ? date.getMinutes().toString()
        : '0' + date.getMinutes().toString()
    )
    .replace(
      'ss',
      date.getSeconds().toString().length > 1
        ? date.getSeconds().toString()
        : '0' + date.getSeconds().toString()
    )
  if (pattern.indexOf('HH') != -1) {
    result.replace(
      'HH',
      date.getHours().toString().length > 1
        ? date.getHours().toString()
        : '0' + date.getHours().toString()
    )
  }
  if (pattern.indexOf('hh') != -1) {
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    result = result.replace(
      'hh',
      hour.toString().length > 1 ? hour.toString() : '0' + hour.toString()
    )
  }
  return result
}

export { getCurrentYear, getCurrentMonth, getDaysOfMonth, getMonthPage, formater, type ZlDay }
