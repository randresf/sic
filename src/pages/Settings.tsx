import React, { useState } from "react"
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react"
import Loading from "../components/formElements/Loading"
import { useMeetingsQuery } from "../generated/graphql"
import { MEETINGS_LIST } from "../ui/formIds"
import ShouldRender from "../components/ShouldRender"
import SearchMeeting from "../components/SeachMeeting"
import ModalWrapper from "../components/ModalWrapper"
import MeetingDataForm from "../container/formMeetingData"
import RenderMeetings from "../container/RenderMeetings"
import PrimaryButton from "../components/formElements/PrimaryButton"
import NewMeetingCard from "../components/NewMeetingCard"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useDeleteMeetMutation } from "../generated/graphql"
import { useIsAuth } from "../hooks/useIsAuth"
import isEmpty from "../utils/isEmpty"

const Settings = () => {
  useIsAuth()
  const [{ data, fetching }] = useMeetingsQuery()
  const [newMeeting, setNewMeeting] = useState(false)
  const [deleteMeeting, setDeleteMeeting] = useState(false)
  const [meetingData, setMeeting] = useState({})
  const [, getIdMeetMutation] = useDeleteMeetMutation()
  const toast = useToast()

  const onCloseFormMeeting = () => {
    setNewMeeting(false)
  }

  const onCloseDeleteMeeting = () => {
    setDeleteMeeting(false)
  }

  const deleteThisMeeting = async (meeting: any) => {
    if (isEmpty(meeting)) return
    const res = await getIdMeetMutation({ meetingId: meeting.id })
    if (res.data?.deleteMeeting.errors) {
      setDeleteMeeting(false)
      return toast({
        title: "No se puede eliminar la reunión",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    setDeleteMeeting(false)
    window.location.reload()
    return toast({
      title: "reunión eliminada correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <Heading as="h2" size="md" id={MEETINGS_LIST.title}>
        Eventos:
      </Heading>
      <SearchMeeting />
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        <NewMeetingCard
          onClick={() => {
            setMeeting({})
            setNewMeeting(true)
          }}
        />
        <ShouldRender if={data && data.meetings}>
          {data?.meetings.map(({ __typename, ...reu }) => (
            <RenderMeetings {...reu}>
              <IconButton
                onClick={() => {
                  setMeeting(reu)
                  setNewMeeting(true)
                }}
                mr={2}
                aria-label="editar"
                icon={<EditIcon />}
              />
              <IconButton
                onClick={() => {
                  setMeeting(reu)
                  setDeleteMeeting(true)
                }}
                aria-label="eliminar"
                icon={<DeleteIcon />}
              />
            </RenderMeetings>
          ))}
        </ShouldRender>
      </Flex>
      <ModalWrapper
        titulo={isEmpty(meetingData) ? "Nueva reunión" : "Modificar reunión"}
        contenido={
          <MeetingDataForm meeting={meetingData}>
            <PrimaryButton onClick={onCloseFormMeeting} mr={3}>
              volver
            </PrimaryButton>
          </MeetingDataForm>
        }
        isOpen={newMeeting}
        onClose={onCloseFormMeeting}
      />
      <ModalWrapper
        titulo="Eliminar reunión"
        contenido={
          <>
            <Text>Seguro que desea eliminar esta reunión?</Text>
            <Box mt={5} float="right">
              <PrimaryButton
                onClick={() => {
                  deleteThisMeeting(meetingData)
                }}
                colorScheme="red"
                mr={3}
              >
                Eliminar
              </PrimaryButton>
              <PrimaryButton onClick={onCloseDeleteMeeting} mr={3}>
                volver
              </PrimaryButton>
            </Box>
          </>
        }
        isOpen={deleteMeeting}
        onClose={onCloseDeleteMeeting}
      />
    </Box>
  )
}

export default Settings
