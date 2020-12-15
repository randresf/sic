import { PersonalDataType } from "../components/types"
import { GetDisplayText } from "./displayText"

const isPersonalDataValid = ({
  document,
  firstName,
  lastName,
  phone,
  email,
  birthDate,
}: PersonalDataType) => {
  const errors: any = {}
  //required field
  if (!document) {
    errors.document = GetDisplayText("form.required", "requerido")
  }
  if (String(document).length < 7) {
    errors.document = GetDisplayText(
      "field.incorrect_value",
      "formato incorrecto"
    )
  }
  if (!firstName) {
    errors.firstName = GetDisplayText("form.required", "requerido")
  }
  if (!lastName) {
    errors.lastName = GetDisplayText("form.required", "requerido")
  }
  if (!phone) {
    errors.phone = GetDisplayText("form.required", "requerido")
  }
  // if (!email) {
  //   errors.email = GetDisplayText('form.required', 'requerido')
  // }
  if (!birthDate) {
    errors.birthDate = GetDisplayText("form.required", "requerido")
  } else if (Number(birthDate.substr(0, 4)) >= 2017) {
    errors.birthDate = GetDisplayText(
      "field.incorrect_value",
      "formato incorrecto"
    )
  }

  //exceptions
  if (String(phone).length !== 7 && String(phone).length !== 10) {
    errors.phone = GetDisplayText("field.incorrect_value", "formato incorrecto")
  }

  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  if (!regex.test(email)) {
    errors.email = GetDisplayText("field.incorrect_value", "formato incorrecto")
  }

  const docRegex = /^[0-9*]+$/g
  if (document && !docRegex.test(document)) {
    errors.document = GetDisplayText(
      "field.incorrect_value",
      "formato incorrecto"
    )
  }

  const textRegex = /^[a-zA-Z*]+(([',. -*][a-zA-Z ])?[a-zA-Z]*)*$/g
  if (firstName && !textRegex.test(firstName)) {
    errors.firstName = GetDisplayText(
      "field.incorrect_value",
      "formato incorrecto"
    )
  }
  // if (lastName && !textRegex.test(lastName)) {
  //   errors.lastName = GetDisplayText("field.incorrect_value", "formato incorrecto")
  // }

  return errors
}

export default isPersonalDataValid
