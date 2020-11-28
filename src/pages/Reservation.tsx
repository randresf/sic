import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import { useHistory, useParams } from "react-router-dom"
import Wrapper from "../components/Wrapper"
import ReservationView from "../container/reservation"
import queryString from "query-string"

const ReservationData = (props: any) => {
  const history = useHistory()
  let { reservationId }: any = useParams()
  const { external } = queryString.parse(props.location.search)
  if (!reservationId) history.push("/")
  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading>Reserva</Heading>
        {
          <ReservationView
            reservationId={reservationId}
            external={!!external}
          />
        }
      </Flex>
    </Wrapper>
  )
}

export default ReservationData
