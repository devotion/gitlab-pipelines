import { useEffect } from 'react'

export default (ref, callback) => {
  useEffect(() => {
    const handleClickAway = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickAway)

    return () => {
      document.removeEventListener('mousedown', handleClickAway)
    }
  }, [callback, ref])
}
