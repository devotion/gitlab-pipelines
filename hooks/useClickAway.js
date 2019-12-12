import { useEffect } from 'react'

export default (ref, callback) => {
  const handleClickAway = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway)

    return () => {
      document.removeEventListener('mousedown', handleClickAway)
    }
  }, [])
}
