export type FormikType = {
  field: any
  form: {
    errors: any
    touched: any
  }
}

export type CheckboxPropsType = {
  name: string
  colorScheme: string
  children: any
  defaultIsChecked: boolean
}

export type PersonalDataType = {
  document?: string | undefined
  firstName: string
  lastName: string
  phone: number | string
  email: string
  birthDate: string
  formatMessage?: any | undefined
}

export type DefaultFun = (param: any) => void
