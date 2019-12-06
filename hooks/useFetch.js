import { useState, useEffect, useCallback } from 'react'
import fetch from 'isomorphic-unfetch'

export default (endpoint, options, trackingArray = [], defaultData = {}) => {
  const [data, setData] = useState(defaultData)
  const [fetching, setFetching] = useState(false)

  const fetchData = useCallback(async () => {
    if (!endpoint.includes('https')) return
    setFetching(true)

    const response = await fetch(endpoint, options)
    const data = await response.json()

    setData(data)

    setFetching(false)
  })

  useEffect(() => {
    fetchData()
  }, trackingArray)

  return [data, fetching, fetchData]
}
