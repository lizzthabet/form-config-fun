export function FormField (props) {
  const { name, type, labelText, value, required, enabled, handleChange } = props

  // If a field isn't enabled, don't render it
  if (!enabled) {
    return null
  }

  return (
    <label htmlFor={ name } className='form-field'>
      <span className='form-label'>
        { labelText }{required && '*'}
      </span>
      <input
        className='form-input'
        id={ name }
        value={ value }
        type={ type }
        required={ required }
        onChange={ handleChange } />
    </label>
  )
}