import App from 'next/app'
import AuthContext from '../contexts/auth'
import MyProjectsContext from '../contexts/my-projects'

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
