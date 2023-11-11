const positiveIntegerRegex = '^[0-9]*[1-9][0-9]*$'

const isPositiveInteger = (data: string | number): boolean => {
  const regExp = new RegExp(positiveIntegerRegex)
  if (typeof data === 'number') {
    data = data.toString()
  }
  return regExp.test(data)
}

export { isPositiveInteger }
