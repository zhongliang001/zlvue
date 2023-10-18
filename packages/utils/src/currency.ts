export const formatCurrency = (data: String | number, digit: number | undefined): string => {
  const curr: string = data.toString()
  const currs: string[] = curr.split('.')
  let zeros: string = '.'
  if (digit && digit > 0) {
    for (let num = 0; num < digit; num++) {
      zeros += '0'
    }
  }
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
      currency += zeros
    }
    return parseInt(currency).toFixed(digit)
  } else {
    if (fData) {
      intData += '.' + fData
    } else {
      intData += zeros
    }
    return parseInt(intData).toFixed(digit)
  }
}
