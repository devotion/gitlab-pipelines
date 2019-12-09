import { useContext, useRef } from 'react'

import { MyProjectsContext } from '../contexts/my-projects'
import useClickAway from '../hooks/useClickAway'

import './dropdown.scss'

const Dropdown = ({ projects = [], dropdownActive, closeDropdown }) => {
  const dropdownRef = useRef()
  useClickAway(dropdownRef, closeDropdown)

  if (projects.error) {
    return (
      <ul
        className={`dropdown ${
          dropdownActive ? 'dropdown__active' : ''
        } dropdown__error`}
        ref={dropdownRef}
      >
        <li>{projects.error_description}</li>
      </ul>
    )
  }

  const { addMyProject } = useContext(MyProjectsContext)

  if (!projects.length) {
    return (
      <ul
        className={`dropdown ${
          dropdownActive ? 'dropdown__active' : ''
        } dropdown__no-projects-found`}
        ref={dropdownRef}
      >
        <li>No projects found</li>
      </ul>
    )
  }

  return (
    <ul
      className={`dropdown ${dropdownActive ? 'dropdown__active' : ''}`}
      ref={dropdownRef}
    >
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
