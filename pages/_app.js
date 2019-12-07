import App from 'next/app'
import AuthContext from '../contexts/auth'
import MyProjectsContext from '../contexts/my-projects'
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
      <AuthContext>
        <MyProjectsContext>
          <Component {...pageProps} />
        </MyProjectsContext>
      </AuthContext>
    )
  }
}

export default MyApp
