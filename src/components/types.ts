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
  type: string
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

export type AdminDataType = {
  firstName: string
  lastName: string
  phone: number | string
  email: string
  username: string
  password: string
  repeatPassword: string
  formatMessage?: any | undefined
}

export type PlaceDataType = {
  name: string
  way: string
  firstWayNumber: number
  secondWayNumber: number
  thirdWayNumber: number
  address: string
  formatMessage?: any | undefined
}

export type MeetingDataType = {
  title: string
  meetingDate: any
  spots: number
  place: string
  isActive: string
  formatMessage?: any | undefined
}

export type SettingsDataType = {
  firstName: string
  lastName: string
  phone: number
  email: string
  password?: string
  newPassword?: string
  repeatPassword?: string
  formatMessage?: any | undefined
}

export type QuestionDataType = {
  contactNumber: number
  emergenceContact: string
  formatMessage?: any | undefined
}

export type DefaultFun = (param: any) => void
