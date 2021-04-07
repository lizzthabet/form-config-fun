import { useState } from 'react';
import { configToFormValue, getFormData, getFieldValue } from './form-helpers';
import { FormField } from './FormField';
import { FORM_STATUS, FormStatusMessage } from './FormStatusMessage';

export function Form(props) {
  const { title, formConfig } = props

  /*
   * The form component keeps two pieces of state:
   *
   * - formValue: a data representation of the form,
   *              including an entry for each field
   *              that indicates its current value,
   *              whether or not it's required, and
   *              whether or not it's enabled
   *
   * - formStatus: either incomplete, complete, or
   *              error state
   */

  // Create the form value state from its configuration
  const initialFormValue = configToFormValue(formConfig)

  // Set pieces of form state
  const [formValue, setFormValue] = useState(initialFormValue)
  const [formStatus, setFormStatus] = useState(FORM_STATUS.Incomplete)

  function setFieldValue(fieldName) {
    return (event) => {
      const newValue = getFieldValue(event.target)
      const field = formValue[fieldName]
      const updatedFormValue = { ...formValue }

      // Update the value for the field
      updatedFormValue[fieldName] = { ...field, value: newValue }

      // If a field's value affects another field, check to see if it should be enabled
      if (field.dependentField) {
        const { name: dependentName, showIf } = field.dependentField
        const enabled = showIf(newValue)
        const dependentField = formValue[dependentName]

        // Update the enabled status for the dependent field
        updatedFormValue[dependentName] = { ...dependentField, enabled }
      }

      // Update the whole form status
      setFormValue(updatedFormValue)

      // If a form's already been submitted or has errored,
      // but new data is being entered, reset the form status
      if (formStatus !== FORM_STATUS.Incomplete) {
        setFormStatus(FORM_STATUS.Incomplete)
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    try {
      // If the form's been submitted sucessfully already, trigger a fake error
      if (formStatus === FORM_STATUS.Submitted) {
        throw new Error('You can\'t submit the same data twice.')
      }

      // Otherwise, treat form submission as successful and log the data
      setFormStatus(FORM_STATUS.Submitted)

      const submittedFormData = getFormData(formValue)

      console.log('Form data:', submittedFormData)
    } catch (error) {
      // Log the error
      console.error('Error in form submit:', error && error.message)

      // Set form status to error
      setFormStatus(FORM_STATUS.Error)
    }
  }

  return (
    <>
      <h1>{ title }</h1>
      <form onSubmit={ handleSubmit }>
        {formConfig.map((fieldConfig => {
          const { name, type, labelText } = fieldConfig
          const { value, required, enabled } = formValue[name]
          return (
            <FormField
              enabled={ enabled }
              key={ name }
              labelText={ labelText }
              name={ name }
              required={ required }
              type={ type }
              value={ value }
              handleChange={ setFieldValue(name) }
            />
          )
        }))}

        <FormStatusMessage status={ formStatus } />

        <button className='form-submit' type='submit'>Submit</button>
      </form>
    </>
  );
}
