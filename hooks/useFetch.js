import { useState, useEffect, useCallback, useContext } from 'react'
import fetch from 'isomorphic-unfetch'
import useWhyDidYouUpdate from './useWhyDidYouUpdate'

import { AuthContext } from '../contexts/auth'

function useFetch(endpoint) {
  const [data, setData] = useState({})
  const [fetching, setFetching] = useState(false)

  const {
    credentials: { token }
  } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    if (!endpoint.includes('https')) return
    setFetching(true)

    const response = await fetch(endpoint, {
      headers: { 'Private-Token': token }
    })
    const data = await response.json()

    setData(data)

    setFetching(false)
  }, [endpoint, token])

  useEffect(() => {
    fetchData()
  }, [fetchData, endpoint])

  useWhyDidYouUpdate('useFetch', { endpoint, token, fetchData })

  return [data, fetching, fetchData]
}

export default useFetch
