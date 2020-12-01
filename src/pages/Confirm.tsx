import { Box, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading"
import Wrapper from "../components/Wrapper"
import YesNoButtonGroup from "../components/YesNoButtonGroup"
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
    if (res.data?.addReservation.errors)
      return toast({
        status: "error",
        duration: 3000,
        isClosable: true,
        title: "error al confirmar",
        description: res.data.addReservation.errors[0].message,
      })
    history.push(`/reservation/${res.data?.addReservation.reservation?.id}`)
  }

  return (
    <Wrapper variant="small">
      <Flex w="100%" alignItems="center" flexDir="column">
        <Heading mb={5} as="h3">
          {meet?.title}
        </Heading>
        <Flex flexDir="column">
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading as="h4" size="md">
                Usuario:
              </Heading>{" "}
              <Text fontSize="md" ml={15}>
                {objUser?.firstName} {objUser?.lastName}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading as="h4" size="md">
                Documento:
              </Heading>{" "}
              <Text fontSize="md" ml={15}>
                {objUser?.document}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading as="h4" size="md">
                Contacto:
              </Heading>{" "}
              <Text fontSize="md" ml={15}>
                {objUser?.phone}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading as="h4" size="md">
                Correo:
              </Heading>{" "}
              <Text fontSize="md" ml={15}>
                {objUser?.email}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading as="h4" size="md">
                Fecha:
              </Heading>
              <Text fontSize="md" ml={15}>
                {meet?.meetingDate}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading as="h4" size="md">
                Cupos disponibles:
              </Heading>
              <Text fontSize="md" ml={15}>
                {meet?.spots}
              </Text>
            </Center>
          </Flex>
          <Box mt={3}>
            <Text fontSize="md" style={{ color: "#dc6d6d" }}>
              Por favor revise la información antes de proceder
            </Text>
          </Box>
        </Flex>
        <Flex mt={3}>
          <YesNoButtonGroup
            onNo={() => history.replace("/")}
            onYes={onConfirm}
            yesProps={{ disabled: confirming }}
          />
          <Loading loading={confirming} />
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default Confirm
