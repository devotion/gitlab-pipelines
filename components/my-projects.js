import { useContext } from 'react'

import { MyProjectsContext } from '../contexts/my-projects'
import ProjectCard from './project-card'

import './my-projects.scss'

function MyProjects() {
  const { myProjects } = useContext(MyProjectsContext)

  if (myProjects.length === 0) return null

  return (
    <div className="my-projects">
      <h2>Projects</h2>
      {myProjects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}

export default MyProjects
