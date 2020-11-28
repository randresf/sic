import { DeleteIcon } from "@chakra-ui/icons"
import {
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
// import Loading from "../components/Loading"
import { useCancelReservationMutation } from "../generated/graphql"
import MSGS from "../locale/es"
import { v4 } from "uuid"
import Loading from "../components/Loading"

type ReservationListProps = {
  reservations: any
  userId: string
  cb: (ev: any) => void
}

const ReservationsList = ({
  reservations,
  userId,
  cb,
}: ReservationListProps) => {
  const [, cancelReserve] = useCancelReservationMutation()
  const [saving, setLoading] = useState(false)
  const toast = useToast()
  if (!reservations) return null
  const onCancel = async (reservationId: string) => {
    setLoading(true)
    const res = await cancelReserve({ reservationId, userId })
    setLoading(false)
    if (res.error)
      return toast({
        title: "no se pudo cancelar la reserva",
        description: res.error.message,
        isClosable: true,
        duration: 3000,
        status: "error",
      })
    toast({
      title: "actualizado correctamente",
      description: "",
      isClosable: true,
      duration: 3000,
      status: "success",
    })
    return cb({ target: { value: userId } })
  }
  return (
    <Flex flexDir="column">
      <Heading as="h3" size="md">
        {MSGS.RESERVATIONS_HEADING}
      </Heading>
      <Wrap>
        {reservations?.map((r: any) => (
          <WrapItem key={v4()}>
            <Center w="80%">
              <Link to={`/reservation/${r.id}`}>
                {r.meeting.title}
                <Text size="sm">({r.meeting.meetingDate})</Text>
              </Link>
            </Center>

            <Center w="20%">
              {saving ? (
                <Loading loading={saving} />
              ) : (
                <IconButton
                  aria-label="cancel"
                  icon={<DeleteIcon />}
                  onClick={() => onCancel(r.id)}
                />
              )}
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}

export default ReservationsList
