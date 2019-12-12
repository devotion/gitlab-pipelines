import App from 'next/app'
import AuthProvider from '../contexts/auth'
import MyProjectsProvider from '../contexts/my-projects'
import Router from 'next/router'

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    Router.events.on('routeChangeComplete', () => {
      const path = '/_next/static/chunks/styles.chunk.css'
      const chunksSelector = `link[href*="${path}"]:not([rel=preload])`
      const chunksNodes = document.querySelectorAll(chunksSelector)
      if (chunksNodes.length) {
        const timestamp = new Date().valueOf()
        chunksNodes[0].href = `${path}?ts=${timestamp}`
      }
    })
  }
})

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <AuthProvider>
        <MyProjectsProvider>
          <Component {...pageProps} />
        </MyProjectsProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
