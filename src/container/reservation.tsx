import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import Loading from "../components/Loading"
import { useSearchReservationQuery } from "../generated/graphql"
import { useLocation } from "react-router-dom"
import queryString from "querystring"
import {MENSAJE_DE_CONFIRMACION} from "../constants/index"
import WrapperButton from "../components/PrimaryButton"

const ReservationView = ({  reservationId }: any) => {
  const [{ data, fetching, error }] = useSearchReservationQuery({
    variables: { reservationId },
  })
  const location = useLocation();
  const {["?external"] : external} = queryString.parse(location.search);
  
  const reser =
    data && data.searchReservation.reservation
      ? data?.searchReservation.reservation
      : null
  return (
    external ? 
    <Box>
      {reser ? (
        <Flex flexDir="column">
          <Box>Reunion reservada: {reser.meeting.title}</Box>
          <Box>Persona que reserva: {reser.citizen.firstName}</Box>
        </Flex>
      ) : null}
      <Loading loading={fetching} />
      {error && <div>{error.message}</div>}
    </Box>
    
    :

    <Box>
      {reser ? (
        <Flex flexDir="column">
          <Box>!BIENVENIDO {reser.citizen.firstName}</Box>
          <Box m="auto">
            <img
              src={reser.qrText}
              alt="qr"
              style={{ width: "210px", height: "210px", objectFit: "cover" }}
            />
          </Box>
          <Box>Reunion reservada: {reser.meeting.title}</Box>
          <Box>Hora: {reser.meeting.meetingDate}</Box>
          <Box>
            <Text>
                {MENSAJE_DE_CONFIRMACION}
            </Text>
          </Box>
          <Box>
            <WrapperButton>Descargar comprobante</WrapperButton>
            <WrapperButton>Cancelar reserva</WrapperButton>
          </Box>
        </Flex>
      ) : null}
      <Loading loading={fetching} />
      {error && <div>{error.message}</div>}
    </Box>
  )
}

export default ReservationView
