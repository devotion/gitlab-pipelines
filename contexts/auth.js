import { createContext, useState, useEffect } from 'react'
import Router from 'next/router'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [credentials, setCredentials] = useState({
    token: '',
    registry: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('gitlab-token', token)
    const registry = localStorage.getItem('gitlab-registry', registry)

    if (token && registry) {
      setCredentials({ token, registry })
    }
  }, [])

  function login(token, registry) {
    localStorage.setItem('gitlab-token', token)
    localStorage.setItem('gitlab-registry', registry)

    setCredentials({
      token,
      registry
    })

    Router.push('/')
  }

  function logout() {
    localStorage.removeItem('gitlab-token')
    localStorage.removeItem('gitlab-registry')

    Router.push('/login')

    setCredentials({
      token: '',
      registry: ''
    })
  }

  return (
    <AuthContext.Provider
      value={{
        credentials,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
