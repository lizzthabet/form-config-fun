export function configToFormValue(config) {
  if (!config || config.length === 0) {
    return {}
  }

  return config.reduce((form, fieldConfig) => {
    const { name, required, type, conditional } = fieldConfig

    // Assume that an empty string is an acceptable initial state, except for checkbox fields
    const initialValue = type === 'checkbox' ? false : ''

    // Add the field to the form
    form[name] = { value: initialValue, enabled: true, required }

    // If a field's display conditionally relies on the value of another field,
    // add it to that field's configuration.
    // Note: this conditional logic assumes that fields are added in the order
    // of their appearance and that a field will only rely on a field before it,
    // AND one field can only trigger the conditional display of one other field
    // (rather than multiple fields), but this code could easily be refactored
    // to support either of those pieces of functionality :)
    if (conditional) {
      const { name: linkedField, showIf } = conditional
      form[linkedField].dependentField = { name, showIf }

      // Adjust the current field's state based on its linked field
      const isEnabledInitially = showIf(form[linkedField].value)
      form[name].enabled = isEnabledInitially
    }

    return form
  }, {})
}

export function getFormData(formValue) {
  const formData = {}
  for (const field in formValue) {
    formData[field] = formValue[field].value
  }

  return formData
}

export function getFieldValue(fieldElement) {
  // Access the field's value based on its type
  if (fieldElement.type === 'checkbox') {
    return fieldElement.checked
  } else {
    return fieldElement.value
  }
}
