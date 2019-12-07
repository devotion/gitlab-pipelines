import { useField } from 'formik'

import './text-input.scss'

const TextInput = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props)

  const hasValue = Boolean(meta.value)

  return (
    <div
      className={`text-input ${
        meta.touched && meta.error ? 'input__error' : ''
      }`}
    >
      <input {...field} {...props} />
      <div
        className={`input__placeholder ${
          hasValue ? 'input__selected' : 'input__not-selected'
        }`}
      >
        {placeholder}
      </div>
    </div>
  )
}

export default TextInput
