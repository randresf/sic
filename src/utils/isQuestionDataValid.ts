import { QuestionDataType } from "../components/types"

const isQuestionDataValid = ({
  contactNumber,
  emergenceContact,
  formatMessage,
}: QuestionDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })

  const onlyLetters = /^[a-zA-Z\s]*$/

  if (!contactNumber) {
    errors.contactNumber = IS_REQUIRED
  } else if (
    String(contactNumber).length !== 7 &&
    String(contactNumber).length !== 10
  ) {
    errors.contactNumber = IS_INCORRECT
  }

  if (!emergenceContact) {
    errors.emergenceContact = IS_REQUIRED
  } else if (!onlyLetters.test(emergenceContact)) {
    errors.emergenceContact = IS_INCORRECT
  }

  return errors
}

export default isQuestionDataValid
