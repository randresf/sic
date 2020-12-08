import { Flex } from "@chakra-ui/react"
import React from "react"
import { useHistory, useLocation, useParams } from "react-router-dom"
import Wrapper from "../components/Wrapper"
import ReservationView from "../container/reservation"
import queryString from "query-string"

const ReservationData = () => {
  const history = useHistory()
  const location = useLocation()
  let { reservationId }: any = useParams()
  const { external = false } = queryString.parse(location.search)
  if (!reservationId) history.push("/")
  return (
    <Wrapper variant="regular">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
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
