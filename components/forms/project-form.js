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

function ProjectForm() {
  const [projects, setProjects] = useState([])
  const [dropdownActive, setDropdownActive] = useState(false)
  const [fetchingProjects, setFetchingProjects] = useState(false)

  const {
    credentials: { token, registry }
  } = useContext(AuthContext)

  async function onSubmit(values) {
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
