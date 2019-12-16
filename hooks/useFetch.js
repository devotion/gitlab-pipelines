import { useState, useEffect, useCallback, useContext } from 'react'
import fetch from 'isomorphic-unfetch'

import { AuthContext } from '../contexts/auth'

function useFetch(endpoint, defaultData = {}) {
  const [data, setData] = useState(defaultData)
  const [fetching, setFetching] = useState(false)

  const {
    credentials: { token }
  } = useContext(AuthContext)

  const fetchData = useCallback(
    async function() {
      if (!endpoint.includes('https')) return
      setFetching(true)

      const response = await fetch(endpoint, {
        headers: { 'Private-Token': token }
      })
      const data = await response.json()

      setData(data)

      setFetching(false)
    },
    [endpoint, token]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData, endpoint])

  return [data, fetching, fetchData]
}

export default useFetch
