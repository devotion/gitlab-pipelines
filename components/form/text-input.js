import React from 'react'
import { useField } from 'formik'

import './text-input.scss'

const TextInput = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div
      className={`text-input ${
        meta.touched && meta.error ? 'input__error' : ''
      }`}
    >
      <input placeholder={placeholder} {...field} {...props} />
    </div>
  )
}

export default TextInput
