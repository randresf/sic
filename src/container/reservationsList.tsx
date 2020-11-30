import { SearchIcon } from "@chakra-ui/icons"
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
  Link,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
// import Loading from "../components/Loading"
import { useCancelReservationMutation } from "../generated/graphql"
import MSGS from "../locale/es"
import { v4 } from "uuid"
import Loading from "../components/Loading"

type ReservationListProps = {
  reservations: any
  userId: string
  cb: (ev: any) => void
}

const ReservationsList = ({
  reservations,
  userId,
  cb,
}: ReservationListProps) => {
  const [, cancelReserve] = useCancelReservationMutation()
  const [saving, setLoading] = useState(false)
  const history = useHistory()
  const toast = useToast()
  if (!reservations) return null
  // const onCancel = async (reservationId: string) => {
  //   setLoading(true)
  //   const res = await cancelReserve({ reservationId, userId })
  //   setLoading(false)
  //   if (res.error)
  //     return toast({
  //       title: "no se pudo cancelar la reserva",
  //       description: res.error.message,
  //       isClosable: true,
  //       duration: 3000,
  //       status: "error",
  //     })
  //   toast({
  //     title: "actualizado correctamente",
  //     description: "",
  //     isClosable: true,
  //     duration: 3000,
  //     status: "success",
  //   })
  //   return cb({ target: { value: userId } })
  // }
  return (
    <Flex flexDir="column">
      <Heading mt={3} mb={2} as="h3" size="md">
        {MSGS.RESERVATIONS_HEADING}
      </Heading>
      <Wrap>
        {reservations?.map((r: any) => (
          <WrapItem mb={3} w="70%" key={v4()}>
            <Center>
              <Box w="100%">
                <Link href={`/reservation/${r.id}`}>{r.meeting.title}</Link>
                <Text size="sm">({r.meeting.meetingDate})</Text>
              </Box>
              <Flex>
                <IconButton
                  ml={5}
                  mr={3}
                  aria-label="Search reservation"
                  onClick={() => {
                    history.push(`/reservation/${r.id}`)
                  }}
                  icon={<SearchIcon />}
                />
              </Flex>
            </Center>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  )
}

export default ReservationsList
