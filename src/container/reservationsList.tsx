import { DeleteIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import Loading from "../components/Loading"
import { useCancelReservationMutation } from "../generated/graphql"
import MSGS from "../locale/es"
import { v4 } from "uuid"
import Loading from "../components/Loading"

type ReservationListProps = {
  reservations: any
  userId: string
  meetingId: string
  cb: () => void
}

const ReservationsList = ({
  reservations,
  userId,
  meetingId,
  cb,
}: ReservationListProps) => {
  const [, cancelReserve] = useCancelReservationMutation()
  const [saving, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [usrReserv, setReservations] = useState([])
  const toast = useToast()
  const history = useHistory()

  useEffect(() => {
    setReservations(reservations)
    if (reservations.find(({ meetingId: id }: any): any => id === meetingId))
      setBooked(true)
  }, [reservations, meetingId])

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
    const newReserv = usrReserv.filter(({ id }: any) => id !== reservationId)
    cb()
    return setReservations(newReserv)
  }

  if (saving) return <Loading loading={saving} />
  if (usrReserv.length === 0) return null
  return (
    <Flex flexDir="column" flexWrap="wrap">
      {booked && (
        <Box>
          <Text fontStyle="italic" p={2}>
            Nota: el usuario ya tiene esta reunion reservada
          </Text>
        </Box>
      )}
      <Heading as="h3" size="md">
        {MSGS.RESERVATIONS_HEADING}
      </Heading>
      <Wrap>
        {usrReserv?.map((r: any) => (
          <WrapItem key={v4()}>
            <Center w="80%" mr={4}>
              <Link to={`/reservation/${r.id}`}>
                {r.meeting.title}
                <Text size="sm">({r.meeting.meetingDate})</Text>
              </Link>
            </Center>
            <Center>
              <IconButton
                aria-label="Search reservation"
                onClick={() => {
                  history.push(`/reservation/${r.id}`)
                }}
                icon={<SearchIcon />}
                mr={3}
              />
              <IconButton
                onClick={() => {
                  onCancel(r.id)
                }}
                aria-label="cancelar"
                icon={<DeleteIcon />}
              />
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}

export default ReservationsList
