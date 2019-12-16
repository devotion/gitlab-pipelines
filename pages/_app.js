import App from 'next/app'
import AuthProvider from '../contexts/auth'
import MyProjectsProvider from '../contexts/my-projects'
import NotificationsProvider from '../contexts/notifications'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <AuthProvider>
        <MyProjectsProvider>
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MyProjectsProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
