export type FormikType = {
  field: any
  form: {
    errors: any
    touched: any
  }
}

export type CheckboxPropsType = {
  text: string
  color: string
}

export type PersonalDataType = {
  citizenId?: string | undefined
  firstName: string
  lastName: string
  phone: number | string
  email: string
  birthDate: string
}
