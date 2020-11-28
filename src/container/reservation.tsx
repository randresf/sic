import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading"
import { useSearchReservationQuery } from "../generated/graphql"

const ReservationView = ({ external = false, reservationId }: any) => {
  // const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [{ data, fetching, error }] = useSearchReservationQuery({
    variables: { reservationId },
  })
  const reser = data && data?.searchReservation ? data?.searchReservation : null
  return (
    <Box>
      {reser ? (
        <Flex>
          <div>reservation: {JSON.stringify(reser)}</div>
          <img src={reser.qrText} alt="qr" />
        </Flex>
      ) : null}
      <Loading loading={fetching} />
      {error && <div>{error.message}</div>}
    </Box>
  )
}

export default ReservationView
