import { PlaceDataType } from "../components/types"

const isPlaceDataValid = ({
  name,
  way,
  firstWayNumber,
  secondWayNumber,
  thirdWayNumber,
  address,
  formatMessage,
}: PlaceDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })
  const isValidNumber = /^[0-9]{1,3}?\s+[a-zA-Z]{0,2}?$/
  const isValidThridNumber = /^[0-9]{1,3}?/

  if (!name) {
    errors.name = IS_REQUIRED
  } else if (name.length < 3 || name.length > 50) {
    errors.name = IS_INCORRECT
  }

  if (!way) {
    errors.way = IS_REQUIRED
  }

  if (!firstWayNumber) {
    errors.firstWayNumber = IS_REQUIRED
  } else if (!isValidNumber.test(String(firstWayNumber))) {
    errors.firstWayNumber = IS_INCORRECT
  }

  if (!secondWayNumber) {
    errors.secondWayNumber = IS_REQUIRED
  } else if (!isValidNumber.test(String(secondWayNumber))) {
    errors.secondWayNumber = IS_INCORRECT
  }

  if (!thirdWayNumber) {
    errors.thirdWayNumber = IS_REQUIRED
  } else if (!isValidThridNumber.test(String(thirdWayNumber))) {
    errors.thirdWayNumber = IS_INCORRECT
  }

  if (!address) {
    errors.address = IS_REQUIRED
  } else if (address.length < 3 || address.length > 50) {
    errors.address = IS_INCORRECT
  }

  return errors
}

export default isPlaceDataValid
