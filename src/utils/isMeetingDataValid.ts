import { MeetingDataType } from "../components/types"
import moment from "moment"

const isMeetingDataValid = ({
  title,
  meetingDate,
  spots,
  place,
  isActive,
  formatMessage,
}: MeetingDataType) => {
  const errors: any = {}
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const IS_INCORRECT = formatMessage({ id: "field.incorrect_value" })

  if (!title) {
    errors.title = IS_REQUIRED
  } else if (title.length < 2 || title.length > 30) {
    errors.title = IS_INCORRECT
  }

  if (!meetingDate) {
    errors.meetingDate = IS_REQUIRED
  } else if (meetingDate < moment().format("yyyy-MM-DDThh:mm")) {
    errors.meetingDate = IS_INCORRECT
  }

  if (!place) {
    errors.place = IS_REQUIRED
  }

  if (!spots) {
    errors.spots = IS_REQUIRED
  } else if (spots < 1) {
    errors.spots = IS_INCORRECT
  }

  if (!isActive) {
    errors.isActive = IS_REQUIRED
  }

  return errors
}

export default isMeetingDataValid
