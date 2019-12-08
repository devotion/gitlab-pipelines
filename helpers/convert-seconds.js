export default secondsElapsed => {
  const createMinutes = () => {
    const minutes = Math.floor(secondsElapsed / 60)

    return minutes < 10 ? `0${minutes}` : minutes
  }

  const createSeconds = () => {
    const seconds = secondsElapsed % 60
    return seconds < 10 ? `0${seconds}` : seconds
  }

  if (secondsElapsed > 604800)
    return `${Math.floor(secondsElapsed / 604800)} week(s)`

  if (secondsElapsed > 86400)
    return `${Math.floor(secondsElapsed / 86400)} day(s)`

  if (secondsElapsed > 3600) return `${Math.floor(secondsElapsed / 3600)} h`

  return `${createMinutes()}:${createSeconds()}`
}
