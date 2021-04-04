export const FORM_CONFIGURATION = [
  {
    name: 'firstName',
    type: 'text',
    labelText: 'First Name',
    required: true,
  },
  {
    name: 'lastName',
    type: 'text',
    labelText: 'Last Name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    labelText: 'Email Address',
    required: true,
  },
  {
    name: 'phoneNumber',
    type: 'text',
    labelText: 'Phone Number',
    required: true,
  },
  {
    name: 'jobTitle',
    type: 'text',
    labelText: 'Job Title',
    required: true,
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    labelText: 'Date of Birth',
    required: true,
  },
  {
    name: 'parentalConsent',
    type: 'checkbox',
    labelText: 'Parental Consent',
    required: true,
    conditional: {
      name: 'dateOfBirth',
      showIf: (value) => {
        if (!value) {
          return false
        }

        const now = new Date();
        const formattedValue = new Date(...value.split('-'))

        return formattedValue >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
      }
    }
  }
];