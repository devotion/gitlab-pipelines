import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from '../form/text-input'

import './username-form.scss'

const validationSchema = Yup.object().shape({
  username: Yup.string()
})

function UsernameForm() {
  function onSubmit() {
    console.log('submitted')
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        username: ''
      }}
      validationSchema={validationSchema}
    >
      <Form className="username-form" autoComplete="off">
        <TextInput
          placeholder="GitLab username"
          id="username"
          name="username"
        />
        <button type="submit" className="button button-full">
          Add
        </button>
      </Form>
    </Formik>
  )
}

export default UsernameForm
