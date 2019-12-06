import { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import fetch from 'isomorphic-unfetch'

import TextInput from '../form/text-input'
import Dropdown from '../dropdown'
import { AuthContext } from '../../contexts/auth'

import './project-form.scss'

const validationSchema = Yup.object().shape({
  project: Yup.string()
})

const ProjectForm = () => {
  const [projects, setProjects] = useState([])
  const [projectsError, setProjectsError] = useState('')
  const [dropdownActive, setDropdownActive] = useState(false)

  const {
    credentials: { token, registry }
  } = useContext(AuthContext)

  const onSubmit = async values => {
    if (!values.project) {
      setDropdownActive(false)
      return
    }
    const res = await fetch(
      `${registry}/search?scope=projects&search=${values.project}`,
      {
        headers: {
          'Private-Token': token
        }
      }
    )

    const data = await res.json()

    setProjects(data)

    if (data.error) {
      setProjectsError(data.error_description)
    }

    setDropdownActive(true)
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        project: ''
      }}
      validationSchema={validationSchema}
    >
      <Form className="project-form">
        <TextInput placeholder="Search projects" id="project" name="project" />

        {dropdownActive && (
          <Dropdown
            projects={projects}
            error={projectsError}
            closeDropdown={() => {
              setDropdownActive(false)
            }}
          />
        )}
      </Form>
    </Formik>
  )
}

export default ProjectForm