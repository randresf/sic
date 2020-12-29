import { Box, Center, Flex, Heading, Text, useToast } from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Loading from "../components/formElements/Loading"
import Wrapper from "../components/Wrapper"
import YesNoButtonGroup from "../components/YesNoButtonGroup"
import {
  useGetMeetingQuery,
  useGetUserByIdQuery,
  useConfirmReservationMutation,
} from "../generated/graphql"
import { CONFIRM_RESERVATION } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"
import useValidUser from "../utils/validUserInfo"
import DisplayText from "../components/formElements/DisplayMessage"

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
        <Heading id={CONFIRM_RESERVATION.meetTitle} mb={5} as="h3">
          {meet?.title}
        </Heading>
        <Flex flexDir="column">
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading id={CONFIRM_RESERVATION.userTitle} as="h4" size="md">
                <DisplayText id="form.user" defaultMessage="User" />:
              </Heading>{" "}
              <Text id={CONFIRM_RESERVATION.fullnameUser} fontSize="md" ml={15}>
                {objUser?.firstName} {objUser?.lastName}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading id={CONFIRM_RESERVATION.documentTitle} as="h4" size="md">
                <DisplayText id="form.document" defaultMessage="Document" />:
              </Heading>{" "}
              <Text id={CONFIRM_RESERVATION.documentUser} fontSize="md" ml={15}>
                {objUser?.document}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading id={CONFIRM_RESERVATION.contactTitle} as="h4" size="md">
                <DisplayText id="form.contact" defaultMessage="Contact" />:
              </Heading>{" "}
              <Text id={CONFIRM_RESERVATION.contactUser} fontSize="md" ml={15}>
                {objUser?.phone}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading id={CONFIRM_RESERVATION.emailTitle} as="h4" size="md">
                <DisplayText id="form.email" defaultMessage="Email" />:
              </Heading>{" "}
              <Text id={CONFIRM_RESERVATION.emailUser} fontSize="md" ml={15}>
                {objUser?.email}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading id={CONFIRM_RESERVATION.dateTitle} as="h4" size="md">
                <DisplayText id="form.date" defaultMessage="Date" />:
              </Heading>
              <Text id={CONFIRM_RESERVATION.dateUser} fontSize="md" ml={15}>
                {formatDate(meet?.meetingDate || "")}
              </Text>
            </Center>
          </Flex>
          <Flex mb={2} flexDir="row">
            <Center>
              <Heading id={CONFIRM_RESERVATION.spotsTitle} as="h4" size="md">
                <DisplayText
                  id="form.SpaceAvailable"
                  defaultMessage="Space available"
                />
                :
              </Heading>
              <Text id={CONFIRM_RESERVATION.spotsUser} fontSize="md" ml={15}>
                {meet?.spots}
              </Text>
            </Center>
          </Flex>
          <Box mt={3}>
            <Text
              id={CONFIRM_RESERVATION.confirmDates}
              fontSize="md"
              style={{ color: "#dc6d6d" }}
            >
              <DisplayText id="app.confirm.notice" />
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
