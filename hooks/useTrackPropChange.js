import { useRef, useEffect } from 'react'

export default (prop, callback) => {
  const previousValue = useRef(prop)

  useEffect(() => {
    if (previousValue.current !== prop) {
      previousValue.current = prop
      callback()
    }
  }, [prop])
}
