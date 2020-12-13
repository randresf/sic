import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import moment from "moment"
import React from "react"
import { RESERVATIONS_LIST } from "../ui/formIds"
import WrapperButton from "./PrimaryButton"

type CancelProps = {
  onClick: (a: any) => void
  meetingDate: string
  labeled?: boolean
}

const CancelReservation = ({
  onClick,
  meetingDate,
  labeled = false,
}: CancelProps) => {
  const canDelete = moment(meetingDate) > moment()
  const props = {
    onClick,
    id: RESERVATIONS_LIST.btnCancelReservation,
  }
  if (!canDelete) return null
  return labeled ? (
    <WrapperButton {...props}>cancelar</WrapperButton>
  ) : (
    <IconButton {...props} aria-label="cancelar" icon={<DeleteIcon />} />
  )
}

export default CancelReservation
