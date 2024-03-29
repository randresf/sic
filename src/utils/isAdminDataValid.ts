import { AdminDataType } from "../components/types"
import { EMAIL_RGX, ONLY_LETTERS_RGX, PWD_RGX } from "./fieldsRegex"

const isAdminDataValid = ({
  firstName,
  lastName,
  phone,
  email,
  username,
  password,
  repeatPassword,
  formatMessage,
}: AdminDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })
  const IS_PWD = formatMessage({ id: "form.pssCorrect" })
  const IS_PWDNOREPEAT = formatMessage({ id: "app.login.pwdIncorret" })

  if (!firstName) {
    errors.firstName = IS_REQUIRED
  } else if (firstName.length < 4 || firstName.length > 15) {
    errors.firstName = IS_INCORRECT
  } else if (!ONLY_LETTERS_RGX.test(firstName)) {
    errors.firstName = IS_INCORRECT
  }

  if (!lastName) {
    errors.lastName = IS_REQUIRED
  } else if (lastName.length < 3 || lastName.length > 15) {
    errors.lastName = IS_INCORRECT
  } else if (!ONLY_LETTERS_RGX.test(lastName)) {
    errors.lastName = IS_INCORRECT
  }

  if (!phone) {
    errors.phone = IS_REQUIRED
  } else if (String(phone).length !== 7 && String(phone).length !== 10) {
    errors.phone = IS_INCORRECT
  }

  if (!email) {
    errors.email = IS_REQUIRED
  } else if (!EMAIL_RGX.test(email)) {
    errors.email = IS_INCORRECT
  }

  if (!username) {
    errors.username = IS_REQUIRED
  } else if (username.length < 5 || username.length > 10) {
    errors.username = IS_INCORRECT
  }

  if (!password) {
    errors.password = IS_REQUIRED
  } else if (!PWD_RGX.test(password)) {
    errors.password = IS_PWD
  }

  if (!repeatPassword) {
    errors.repeatPassword = IS_REQUIRED
  } else if (repeatPassword !== password) {
    errors.repeatPassword = IS_PWDNOREPEAT
  }

  return errors
}

export default isAdminDataValid
