import { useContext } from 'react'
import ProjectForm from './forms/project-form'
import MyProjects from './my-projects'
import Link from 'next/link'

import { AuthContext } from '../contexts/auth'

import './sidebar.scss'

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  return (
    <div className="sidebar">
      <Link href="/">
        <h1>GitLab Pipelines 1.0.0</h1>
      </Link>
      <ProjectForm />
      <MyProjects />
      <button onClick={logout}>Sign out</button>
    </div>
  )
}

export default Sidebar
