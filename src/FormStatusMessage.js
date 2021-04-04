export const FORM_STATUS = {
  Error: 'error',
  Incomplete: 'incomplete',
  Submitted: 'submitted',
}

export function FormStatusMessage (props) {
  const { status } = props

  // Don't display any message when a form isn't complete
  if (status === FORM_STATUS.Incomplete) {
    return null
  }

  if (status === FORM_STATUS.Submitted) {
    return (
      <p role='alert' className='status-success'>Form submitted: You did it! Data is in the console.</p>
    )
  }

  if (status === FORM_STATUS.Error) {
    return (
      <p role='alert' className='status-error'>Error: Yikes, you submitted your form twice. Edit the data before submitting it again.</p>
    )
  }
}