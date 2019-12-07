import { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import fetch from 'isomorphic-unfetch'

import TextInput from '../form/text-input'
import Dropdown from '../dropdown'
import LoadingSpinner from '../loading/loading-spinner'
import { AuthContext } from '../../contexts/auth'

import './project-form.scss'

const validationSchema = Yup.object().shape({
  project: Yup.string()
})

const ProjectForm = () => {
  const [projects, setProjects] = useState([])
  const [projectsError, setProjectsError] = useState('')
  const [dropdownActive, setDropdownActive] = useState(false)
  const [fetchingProjects, setFetchingProjects] = useState(false)

  const {
    credentials: { token, registry }
  } = useContext(AuthContext)

  const onSubmit = async values => {
    if (!values.project) {
      setDropdownActive(false)
      return
    }

    setFetchingProjects(true)
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
    setFetchingProjects(false)

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
      <Form className="project-form" autoComplete="off">
        <div className="project-form__search">
          <TextInput
            placeholder="Search projects"
            id="project"
            name="project"
          />

          {fetchingProjects && <LoadingSpinner />}
        </div>

        <Dropdown
          projects={projects}
          error={projectsError}
          fetchingProjects={fetchingProjects}
          closeDropdown={() => {
            setDropdownActive(false)
          }}
          dropdownActive={dropdownActive}
        />
      </Form>
    </Formik>
  )
}

export default ProjectForm
