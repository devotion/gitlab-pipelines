import { useRef, useEffect } from 'react'

function useTrackPropChange(prop, callback) {
  const previousValue = useRef(prop)

  useEffect(() => {
    if (previousValue.current !== prop) {
      previousValue.current = prop
      callback()
    }
  })
}

export default useTrackPropChange
