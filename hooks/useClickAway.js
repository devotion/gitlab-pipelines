import { useEffect } from 'react'

export default (ref, onClickAway) => {
  const handleClickAway = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickAway()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickAway)

    return () => {
      document.removeEventListener('mousedown', handleClickAway)
    }
  }, [])
}
