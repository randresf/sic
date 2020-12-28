import { DeleteIcon } from "@chakra-ui/icons"
import { IconButton, useToast } from "@chakra-ui/react"
import moment from "moment"
import React from "react"
import { useIntl } from "react-intl"
import { useCancelReservationMutation } from "../generated/graphql"
import { RESERVATIONS_LIST } from "../ui/formIds"
import CancelButton from "./formElements/CancelButton"
import Loading from "./formElements/Loading"
import ShouldRender from "./ShouldRender"

type CancelProps = {
  reservationId: string
  meetingDate: string
  userId: string
  labeled?: boolean
  onChange?: () => void
}

const CancelReservation = ({
  reservationId,
  meetingDate,
  labeled = false,
  userId,
  onChange,
}: CancelProps) => {
  const [{ fetching }, cancelReserve] = useCancelReservationMutation()
  const { formatMessage } = useIntl()
  const toast = useToast({ isClosable: true, duration: 3000 })

  const onCancel = async () => {
    const res = await cancelReserve({ reservationId, userId })
    if (res.error)
      return toast({
        title: formatMessage({ id: "app.notification.cancelReservationError" }),
        description: res.error.message,
        status: "error",
      })
    toast({
      title: formatMessage({ id: "app.notification.success" }),
      description: "",
      status: "success",
    })
    if (typeof onChange === "function") onChange()
  }
  if (fetching) return <Loading loading={fetching} />

  const canDelete = moment(meetingDate) > moment()
  const props = {
    onClick: onCancel,
    id: RESERVATIONS_LIST.btnCancelReservation,
  }

  return (
    <ShouldRender if={canDelete}>
      {labeled ? (
        <CancelButton {...props}>cancelar</CancelButton>
      ) : (
        <IconButton {...props} aria-label="cancelar" icon={<DeleteIcon />} />
      )}
    </ShouldRender>
  )
}

export default CancelReservation
