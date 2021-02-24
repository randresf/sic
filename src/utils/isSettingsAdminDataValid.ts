import { SettingsDataType } from "../components/types"

const isSettingsAdminDataValid = ({
  firstName,
  lastName,
  phone,
  email,
  newPassword,
  repeatPassword,
  formatMessage,
}: SettingsDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })

  const onlyLetters = /^[a-zA-Z\s]*$/
  const isEmailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  const IS_PWD = formatMessage({ id: "form.pssCorrect" })
  const IS_PWDNOREPEAT = formatMessage({ id: "app.login.pwdIncorret" })

  if (!firstName) {
    errors.firstName = IS_REQUIRED
  } else if (firstName.length < 4 || firstName.length > 15) {
    errors.firstName = IS_INCORRECT
  } else if (!onlyLetters.test(firstName)) {
    errors.firstName = IS_INCORRECT
  }

  if (!lastName) {
    errors.lastname = IS_REQUIRED
  } else if (lastName.length < 3 || lastName.length > 15) {
    errors.lastname = IS_INCORRECT
  } else if (!onlyLetters.test(lastName)) {
    errors.lastName = IS_INCORRECT
  }

  if (!phone) {
    errors.phone = IS_REQUIRED
  } else if (String(phone).length !== 7 && String(phone).length !== 10) {
    errors.phone = IS_INCORRECT
  }

  if (!email) {
    errors.email = IS_REQUIRED
  } else if (!isEmailValid.test(email)) {
    errors.email = IS_INCORRECT
  }

  if (newPassword) {
    if (!isPasswordValid.test(newPassword || "")) {
      errors.newPassword = IS_PWD
    }
    if (repeatPassword !== newPassword) {
      errors.repeatPassword = IS_PWDNOREPEAT
    }
  }
  console.log(errors)
  return errors
}

export default isSettingsAdminDataValid
