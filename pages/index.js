import { useEffect, useContext, useState } from 'react'
import Router from 'next/router'

import Layout from '../components/layout'
import LoadingPage from '../components/loading/loading-page'
import UsernameForm from '../components/forms/username-form'
import { AuthContext } from '../contexts/auth'

import './index.scss'

function Home() {
  const {
    credentials: { token }
  } = useContext(AuthContext)

  const [notificationsDefault, setNotificationsDefault] = useState(false)

  useEffect(() => {
    if (!token) {
      Router.push('/login')
    }

    if (Notification.permission === 'default') {
      setNotificationsDefault(true)
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
        <h1>Welcome to GitLab Pipelines</h1>
        <p>Choose a project and let&apos;s start</p>

        <div className="home__feature">
          <h2>Track your pipelines</h2>
          <p>
            This is an open source project meant to make it easier for you to
            track your GitLab pipelines.
          </p>
        </div>

        {notificationsDefault && (
          <div className="home__feature">
            <h2>We have browser notifications</h2>
            <p>
              App can send you notifications when some of your monitored
              pipelines pass or fail. Since it is a browser feature, you need to
              enable by clicking here and then choosing `allow`
            </p>
            <p>
              You can edit to receive notifications for pipelines you like
              tracked. By default, you will get them for master branch and for a
              chosen username.
            </p>
            <button
              className="button button-full"
              onClick={() => {
                Notification.requestPermission()
              }}
            >
              Enable notifications
            </button>
          </div>
        )}
        <div className="home__feature">
          <h2>Add your username</h2>
          <p>
            You can add your gitlab username to enable notifications by default
            for the pipelines that you create
          </p>
          <UsernameForm />
        </div>
      </div>
    </Layout>
  )
}

export default Home
