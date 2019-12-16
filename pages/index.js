import { useEffect, useContext } from 'react'
import Router from 'next/router'

import Layout from '../components/layout'
import LoadingPage from '../components/loading/loading-page'
import { AuthContext } from '../contexts/auth'

import './index.scss'

function Home() {
  const {
    credentials: { token }
  } = useContext(AuthContext)

  useEffect(() => {
    if (!token) {
      Router.push('/config')
    }

    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [token])

  if (!token) {
    return (
      <Layout title="Home" showHeader={false}>
        <LoadingPage />
      </Layout>
    )
  }

  return (
    <Layout title="Home">
      <div className="home">
        <h2>Welcome to GitLab Pipelines.</h2>
        <p>Choose a project and let&apos;s start</p>
      </div>
    </Layout>
  )
}

export default Home
