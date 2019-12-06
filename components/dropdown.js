import { useContext } from 'react'
import './dropdown.scss'
import { MyProjectsContext } from '../contexts/my-projects'

const Dropdown = ({ projects = [], error, closeDropdown }) => {
  if (error) {
    return <div className="dropdown error">{error}</div>
  }

  const { addMyProject } = useContext(MyProjectsContext)

  return (
    <ul className="dropdown">
      {projects.map(project => {
        return (
          <li
            key={project.id}
            onClick={() => {
              addMyProject(
                project.id,
                project.name,
                project.name_with_namespace
              )
              closeDropdown()
            }}
          >
            {project.name}
          </li>
        )
      })}
    </ul>
  )
}

export default Dropdown
