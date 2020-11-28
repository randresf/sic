import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import Loading from "../components/Loading"
import { useSearchReservationQuery } from "../generated/graphql"

const ReservationView = ({ external = false, reservationId }: any) => {
  const [{ data, fetching, error }] = useSearchReservationQuery({
    variables: { reservationId },
  })
  const reser =
    data && data.searchReservation.reservation
      ? data?.searchReservation.reservation
      : null
  return (
    <Box>
      {reser ? (
        <Flex flexDir="column">
          <Box>Reunion reservada: {reser.meeting.title}</Box>
          <Box>Persona que reserva: {reser.citizen.firstName}</Box>
          <Box m="auto">
            <img
              src={reser.qrText}
              alt="qr"
              style={{ width: "210px", height: "210px", objectFit: "cover" }}
            />
          </Box>
        </Flex>
      ) : null}
      <Loading loading={fetching} />
      {error && <div>{error.message}</div>}
    </Box>
  )
}

export default ReservationView
