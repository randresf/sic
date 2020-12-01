import { PersonalDataType } from "../components/types"
import MSGS from "../locale/es"

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
    errors.document = MSGS.REQUIRED
  }
  if (String(document).length < 7) {
    errors.document = MSGS.INCORRECT_VALUE
  }
  if (!firstName) {
    errors.firstName = MSGS.REQUIRED
  }
  if (!lastName) {
    errors.lastName = MSGS.REQUIRED
  }
  if (!phone) {
    errors.phone = MSGS.REQUIRED
  }
  // if (!email) {
  //   errors.email = MSGS.REQUIRED
  // }
  if (!birthDate) {
    errors.birthDate = MSGS.REQUIRED
  } else if (Number(birthDate.substr(0, 4)) >= 2017) {
    errors.birthDate = MSGS.INCORRECT_VALUE
  }

  //exceptions
  if (String(phone).length !== 7 && String(phone).length !== 10) {
    errors.phone = MSGS.INCORRECT_VALUE
  }

  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
  if (!regex.test(email)) {
    errors.email = MSGS.INCORRECT_VALUE
  }

  const docRegex = /^[A-Za-z0-9*]+$/g
  if (document && !docRegex.test(document)) {
    errors.document = MSGS.INCORRECT_VALUE
  }

  const textRegex = /^[a-zA-Z*]+(([',. -*][a-zA-Z ])?[a-zA-Z]*)*$/g
  if (firstName && !textRegex.test(firstName)) {
    errors.firstName = MSGS.INCORRECT_VALUE
  }
  // if (lastName && !textRegex.test(lastName)) {
  //   errors.lastName = MSGS.INCORRECT_VALUE
  // }

  return errors
}

export default isPersonalDataValid
