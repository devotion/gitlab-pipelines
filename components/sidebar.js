import { useContext } from 'react'
import ProjectForm from './forms/project-form'
import MyProjects from './my-projects'

import { AuthContext } from '../contexts/auth'

import './sidebar.scss'

const Sidebar = () => {
  const { logout } = useContext(AuthContext)
  return (
    <div className="sidebar">
      <h1>GitLab Pipelines 1.0.0</h1>
      <ProjectForm />
      <MyProjects />
      <button onClick={logout}>Sign out</button>
    </div>
  )
}

export default Sidebar
