import { Box, Flex, Heading } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import { useGetMeetingsByIdQuery } from "../generated/graphql"
import MSGS from "../locale/es"

type ReservationListProps = {
  reservations: any
}

const ReservationsList = ({ reservations }: ReservationListProps) => {
  if (!reservations) return null
  const ids = reservations?.map((res: any) => res.meetingId)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{ data, error, fetching }] = useGetMeetingsByIdQuery({
    variables: { ids },
  })
  if (fetching) return <Loading loading={fetching} />
  if (error) return <Box>{error.message}</Box>
  if (!data) return null
  const combined = reservations.map((r: any) => ({
    ...r,
    meeting: { ...data.meetingsById.filter((meet) => meet.id === r.meetingId) },
  }))
  return (
    <Flex dir="column">
      <Heading as="h3" size="md">
        {MSGS.RESERVATIONS_HEADING}
      </Heading>
      <Flex>
        {combined?.map((r: any) => (
          <Link to={`/consultReservation/${r.id}`}>{r.meeting.title}</Link>
        ))}
      </Flex>
    </Flex>
  )
}

export default ReservationsList
