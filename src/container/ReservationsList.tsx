import { SearchIcon } from "@chakra-ui/icons"
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
import React from "react"
import { Link, useHistory } from "react-router-dom"
// import Loading from "../components/Loading"
import { useCancelReservationMutation } from "../generated/graphql"
import Loading from "../components/formElements/Loading"
import { formatDate } from "../utils/formatDate"
import { MEETINGS_LIST, RESERVATIONS_LIST } from "../ui/formIds"
import CancelReservation from "../components/CancelReservation"
import DisplayText from "../components/formElements/DisplayMessage"
import ShouldRender from "../components/ShouldRender"
import { useIntl } from "react-intl"

type ReservationListProps = {
  reservations: any
  userId: string
  onChange?: any
}

const ReservationsList = ({
  reservations = [],
  userId,
  onChange,
}: ReservationListProps) => {
  const [{ fetching }, cancelReserve] = useCancelReservationMutation()
  const { formatMessage } = useIntl()
  const toast = useToast({ isClosable: true, duration: 3000 })
  const history = useHistory()

  const onCancel = async (reservationId: string) => {
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
  if (reservations?.length === 0) return null
  return (
    <Flex
      flexDir="column"
      flexWrap="wrap"
      id={RESERVATIONS_LIST.reservationSection}
    >
      <Heading as="h3" size="md" mt={3} id={RESERVATIONS_LIST.title}>
        <DisplayText id="app.reservations.title" defaultMessage="reservas" />
      </Heading>
      <Wrap className={RESERVATIONS_LIST.reservationItem}>
        <ShouldRender if={!reservations || reservations.length === 0}>
          <Text id={MEETINGS_LIST.noResults}>
            <DisplayText
              id="app.reservations.noResults"
              defaultMessage="no reservations"
            />
          </Text>
        </ShouldRender>
        {reservations?.map((r: any) => (
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
