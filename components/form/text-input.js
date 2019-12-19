import PropTypes from 'prop-types'
import { useField } from 'formik'

import './text-input.scss'

function TextInput({ placeholder, ...props }) {
  const [field, meta] = useField(props)

  const hasValue = Boolean(meta.value)

  return (
    <div
      className="text-input"
      data-state={meta.touched && meta.error && 'error'}
    >
      <input {...field} {...props} />
      <div className="input__placeholder" data-state={hasValue && 'hasValue'}>
        {placeholder}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  placeholder: PropTypes.string
}

export default TextInput
