export const formatCurrency = (data: String | number): string => {
  const curr: string = data.toString()
  const currs: string[] = curr.split('.')
  let intData: string = currs[0]
  let currency: string = ''
  const fData: string = currs.length === 1 ? '' : currs[1]
  if (intData.length > 3) {
    const first: number = intData.length % 3
    let pice: number = intData.length / 3
    if (first > 0) {
      currency = intData.substring(0, first)
      if (pice > 0) {
        currency += ','
      }
    }
    let index = 0
    while (pice > 0) {
      currency += intData.substring(first + index * 3, first + (index + 1) * 3)
      pice--
      index++
      if (pice >= 1) {
        currency += ','
      }
    }
    if (fData) {
      currency += '.' + fData
    } else {
      currency += '.00'
    }
    return currency
  } else {
    if (fData) {
      intData += '.' + fData
    } else {
      intData += '.00'
    }
    return intData
  }
}
