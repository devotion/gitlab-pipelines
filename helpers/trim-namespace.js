export default namespace =>
  namespace
    .split(' / ')
    .filter((el, i, arr) => i !== arr.length - 1)
    .map((el, i, arr) => {
      if (i === arr.length - 1) return el
      return `${el} / `
    })
    .join('')
