import { Flex, Heading, Box } from "@chakra-ui/react"
import React from "react"
import { Reservation } from "../generated/graphql"
import { RESERVATION_VIEW } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"

type ExternalProps = {
  reservation: Reservation
}

export default function ExternalReservationView({
  reservation,
}: ExternalProps) {
  return (
    <Flex flexDir="column" alignItems="center" flexWrap="wrap">
      <Heading id={RESERVATION_VIEW.title} mt={2} mb={2} as="h3" size="lg">
        Reserva realizada por {reservation?.citizen.firstName}{" "}
        {reservation?.citizen.lastName}
      </Heading>

      <Box>
        <Box mt={2} mb={3}>
          <Heading id={RESERVATION_VIEW.document} as="h4" size="md">
            Documento:
          </Heading>
          {reservation?.citizen.document}
          <Heading id={RESERVATION_VIEW.meetigTitle} as="h4" size="md">
            Reunión reservada:
          </Heading>
          {reservation?.meeting.title}
          <Heading id={RESERVATION_VIEW.meetingDate} as="h4" size="md">
            Fecha:
          </Heading>
          {formatDate(reservation?.meeting.meetingDate)}
        </Box>
      </Box>
    </Flex>
  )
}
