import { useContext, useRef } from 'react'

import { MyProjectsContext } from '../contexts/my-projects'
import useClickAway from '../hooks/useClickAway'

import './dropdown.scss'

const Dropdown = ({ projects = [], error, closeDropdown }) => {
  const dropdownRef = useRef()

  if (error) {
    return <div className="dropdown error">{error}</div>
  }

  const { addMyProject } = useContext(MyProjectsContext)

  useClickAway(dropdownRef, closeDropdown)

  return (
    <ul className="dropdown" ref={dropdownRef}>
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
