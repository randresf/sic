import { Flex, Heading, Box, Center, Text } from "@chakra-ui/react"
import React from "react"
import { MENSAJE_DE_CONFIRMACION } from "../constants"
import { Reservation } from "../generated/graphql"
import { RESERVATION_VIEW } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"

type UserReservationViewProps = {
  reservation: Reservation
}

export default function UserReservationView({
  reservation,
}: UserReservationViewProps) {
  return (
    <Flex flexDir="column" alignItems="center">
      <Heading id={RESERVATION_VIEW.welcome} mt={2} mb={3} as="h3" size="lg">
        Bienvenid @{reservation?.citizen.firstName}{" "}
        {reservation?.citizen.lastName}
      </Heading>
      <Box m="auto">
        <img
          id={RESERVATION_VIEW.qrCode}
          src={reservation?.qrText}
          alt="qr"
          style={{ width: "210px", height: "210px", objectFit: "cover" }}
        />
      </Box>
      <Box mt={3} mb={3}>
        <Flex flexDir="column" mt={2} mb={3}>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading
                id={RESERVATION_VIEW.reservationTitleDocument}
                as="h4"
                size="md"
              >
                Documento:
              </Heading>
              <Text id={RESERVATION_VIEW.userDocument} fontSize="md" ml={15}>
                {reservation?.citizen.document}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading
                id={RESERVATION_VIEW.reservationTitlemeeting}
                as="h4"
                size="md"
              >
                Reunion reservada:
              </Heading>
              <Text id={RESERVATION_VIEW.userMeeting} fontSize="md" ml={15}>
                {reservation?.meeting.title}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading
                id={RESERVATION_VIEW.reservationTitleDate}
                as="h4"
                size="md"
              >
                Fecha:
              </Heading>
              <Text
                id={RESERVATION_VIEW.reservationUserDate}
                fontSize="md"
                ml={15}
              >
                {formatDate(reservation?.meeting.meetingDate)}
              </Text>
            </Center>
          </Flex>
        </Flex>
        <Text id={RESERVATION_VIEW.msgConfirm}>{MENSAJE_DE_CONFIRMACION}</Text>
      </Box>
    </Flex>
  )
}
