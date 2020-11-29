import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading"
import WrapperButton from "../components/PrimaryButton"
import Wrapper from "../components/Wrapper"
import {
  useGetMeetingQuery,
  useGetUserByIdQuery,
  useConfirmReservationMutation,
} from "../generated/graphql"
import useValidUser from "../utils/validUserInfo"

const Confirm = () => {
  const userId = useValidUser()
  const history = useHistory()
  const toast = useToast()
  const meetingId = localStorage.getItem("meetingId") || ""
  const [, confirm] = useConfirmReservationMutation()
  if (!meetingId) history.push("/")

  const [confirming, setConfirming] = useState(false)
  const [
    { data: userData, fetching: userFetching, error: userError },
  ] = useGetUserByIdQuery({ variables: { userId } })
  const [
    { data: meetingData, fetching: meetingFetching, error: meetingError },
  ] = useGetMeetingQuery({ variables: { id: meetingId } })

  if (userFetching || meetingFetching)
    return <Loading loading={userFetching || meetingFetching} />
  if (userError || !userData)
    return <Box>No se pudo obtener la informacion del usuario</Box>
  if (meetingError || !meetingData)
    return <Box>No se pudo obtener la informacion de la reunion</Box>

  const objUser = userData?.userById?.user
  const meet = meetingData?.meeting?.meeting

  const onConfirm = async () => {
    setConfirming(true)
    const res = await confirm({ userId, meetingId })
    setConfirming(false)
    if (res.error)
      return toast({
        status: "error",
        duration: 3000,
        isClosable: true,
        title: "error al confirmar",
        description: res.error.message,
      })
    localStorage.setItem("userId", userId)
    history.push(`/reservation/${res.data?.addReservation.reservation?.id}`)
  }

  return (
    <Wrapper variant="small">
      <Flex w="100%" alignItems="center" flexDir="column">
        <Heading as="h3">{meet?.title}</Heading>
        <Flex flexDir="column">
          <Box>
            <Heading as="h4" size="md">
              Usuario:
            </Heading>{" "}
            {objUser?.firstName} {objUser?.lastName}
          </Box>
          <Box>
            <Heading as="h4" size="md">
              Documento:
            </Heading>{" "}
            {objUser?.document}
          </Box>
          <Box>
            <Heading as="h4" size="md">
              Contacto:
            </Heading>{" "}
            {objUser?.phone}
          </Box>
          <Box>
            <Heading as="h4" size="md">
              Correo:
            </Heading>{" "}
            {objUser?.email}
          </Box>
          <Box>
            <Heading as="h4" size="md">
              Fecha:
            </Heading>
            {meet?.meetingDate}
          </Box>
          <Box>
            <Heading as="h4" size="md">
              Cupos disponibles:
            </Heading>
            {meet?.spots}
          </Box>
          <Box mt={3}>
            <Text>Por favor confirme la información antes de proceder</Text>
          </Box>
        </Flex>
        <Flex mt={3}>
          <WrapperButton mr={3} onClick={onConfirm} disabled={confirming}>
            confirmar
          </WrapperButton>
          <Button onClick={() => history.replace("/")}>cancelar</Button>
          <Loading loading={confirming} />
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default Confirm
