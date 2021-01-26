import { PersonalDataType } from "../components/types"

const isPersonalDataValid = ({
  document,
  firstName,
  lastName,
  phone,
  email,
  birthDate,
  formatMessage,
}: PersonalDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })
  //required field
  if (!document) {
    errors.document = IS_REQUIRED
  }
  if (String(document).length < 7) {
    errors.document = IS_INCORRECT
  }
  if (!firstName) {
    errors.firstName = IS_REQUIRED
  }
  if (!lastName) {
    errors.lastName = IS_REQUIRED
  }
  if (!phone) {
    errors.phone = IS_REQUIRED
  }
  // if (!email) {
  //   errors.email = GetDisplayText('form.required', 'requerido')
  // }
  if (!birthDate) {
    errors.birthDate = IS_REQUIRED
  } else if (Number(birthDate.substr(0, 4)) >= 2017) {
    errors.birthDate = IS_INCORRECT
  }

  //exceptions
  if (String(phone).length !== 7 && String(phone).length !== 10) {
    errors.phone = IS_INCORRECT
  }

  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  if (!regex.test(email)) {
    errors.email = IS_INCORRECT
  }

  const docRegex = /^[0-9*]+$/g
  if (document && !docRegex.test(document)) {
    errors.document = IS_INCORRECT
  }

  const textRegex = /^[a-zA-Z*]+(([',. -*][a-zA-Z ])?[a-zA-Z]*)*$/g
  if (firstName && !textRegex.test(firstName)) {
    errors.firstName = IS_INCORRECT
  }
  // if (lastName && !textRegex.test(lastName)) {
  //   errors.lastName = GetDisplayText("field.incorrect_value", "formato incorrecto")
  // }

  return errors
}

export default isPersonalDataValid
