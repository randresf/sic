import { PersonalDataType } from "../components/types"
import { DOCUMENT_RGX, EMAIL_RGX, ONLY_LETTERS_RGX } from "./fieldsRegex"

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

  if (!birthDate) {
    errors.birthDate = IS_REQUIRED
  } else if (Number(birthDate.substr(0, 4)) >= 2017) {
    errors.birthDate = IS_INCORRECT
  }

  //exceptions
  if (String(phone).length !== 7 && String(phone).length !== 10) {
    errors.phone = IS_INCORRECT
  }

  if (!EMAIL_RGX.test(email)) {
    errors.email = IS_INCORRECT
  }

  if (document && !DOCUMENT_RGX.test(document)) {
    errors.document = IS_INCORRECT
  }

  if (firstName && !ONLY_LETTERS_RGX.test(firstName)) {
    errors.firstName = IS_INCORRECT
  }
  // if (lastName && !textRegex.test(lastName)) {
  //   errors.lastName = GetDisplayText("field.incorrect_value", "formato incorrecto")
  // }

  return errors
}

export default isPersonalDataValid
