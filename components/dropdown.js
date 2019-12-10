import { useContext, useRef } from 'react'

import { MyProjectsContext } from '../contexts/my-projects'
import useClickAway from '../hooks/useClickAway'
import trimNamespace from '../helpers/trim-namespace'

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

  const { addMyProject, myProjects } = useContext(MyProjectsContext)

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
      {projects.map(({ id, name, name_with_namespace }) => {
        const isAdded = myProjects.find(myProject => myProject.id === id)

        if (isAdded) return null

        return (
          <li
            key={id}
            onClick={() => {
              addMyProject(id, name, name_with_namespace)
              closeDropdown()
            }}
          >
            {name} <span>{trimNamespace(name_with_namespace)}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default Dropdown
