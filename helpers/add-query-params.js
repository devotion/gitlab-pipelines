export default objectWithParams => {
  const hasValues = Object.keys(objectWithParams).filter(key =>
    Boolean(objectWithParams[key])
  )

  if (!hasValues.length) return ''

  const queryString = hasValues.reduce((total, currentValue, index) => {
    if (index === 0) return `?${currentValue}=${objectWithParams[currentValue]}`

    return `${total}&${currentValue}=${objectWithParams[currentValue]}`
  }, '?')

  return queryString
}
