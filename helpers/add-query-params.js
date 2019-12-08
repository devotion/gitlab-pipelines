export default objectWithParams => {
  const hasValues = Object.keys(objectWithParams).filter(key => {
    return Boolean(objectWithParams[key])
  })

  if (!hasValues.length) return ''

  const queryString = hasValues.reduce((total, currentValue, index) => {
    if (index === 0) {
      return `?${currentValue}=${objectWithParams[currentValue]}`
    } else {
      return `${total}&${currentValue}=${objectWithParams[currentValue]}`
    }
  }, '?')

  return queryString
}
