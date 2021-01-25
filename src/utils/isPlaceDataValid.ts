import { PlaceDataType } from "../components/types"

const isPlaceDataValid = ({ name, address, formatMessage }: PlaceDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })

  if (!name) {
    errors.name = IS_REQUIRED
  } else if (name.length < 3 || name.length > 30) {
    errors.name = IS_INCORRECT
  }

  if (!address) {
    errors.address = IS_REQUIRED
  } else if (address.length < 3 || address.length > 25) {
    errors.address = IS_INCORRECT
  }

  return errors
}

export default isPlaceDataValid
