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
import Loading from "../components/Loading"
import { formatDate } from "../utils/formatDate"
import moment from "moment"
import { RESERVATIONS_LIST } from "../ui/formIds"
import CancelReservation from "../components/CancelReservation"

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
    <Flex
      flexDir="column"
      flexWrap="wrap"
      id={RESERVATIONS_LIST.reservationSection}
    >
      {booked && (
        <Box>
          <Text fontStyle="italic" p={2} id={RESERVATIONS_LIST.note}>
            Nota: el usuario ya tiene esta reunion reservada
          </Text>
        </Box>
      )}
      <Heading as="h3" size="md" mt={3} id={RESERVATIONS_LIST.title}>
        {MSGS.RESERVATIONS_HEADING}
      </Heading>
      <Wrap className={RESERVATIONS_LIST.reservationItem}>
        {usrReserv?.map((r: any) => (
          <WrapItem
            key={r.id}
            id={r.id}
            className={RESERVATIONS_LIST.reservationItem}
          >
            <Center w="80%" mr={4}>
              <Link to={`/reservation/${r.id}`} id={RESERVATIONS_LIST.link}>
                <Text id={RESERVATIONS_LIST.meetingTitle}>
                  {r.meeting.title}
                </Text>
                <Text size="sm" id={RESERVATIONS_LIST.meetingDate}>
                  {formatDate(r.meeting.meetingDate)}
                </Text>
              </Link>
            </Center>
            <Center>
              <IconButton
                aria-label="Open reservation"
                onClick={() => {
                  history.push(`/reservation/${r.id}`)
                }}
                icon={<SearchIcon />}
                id={RESERVATIONS_LIST.btnOpenReservation}
                mr={3}
              />
              <CancelReservation
                onClick={() => onCancel(r.id)}
                meetingDate={r.meeting.meetingDate}
              />
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}

export default ReservationsList
