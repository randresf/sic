import React, { useState } from "react"
import { Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react"
import ShouldRender from "../../../components/ShouldRender"
import SearchMeeting from "../SearchMeeting"
import ModalWrapper from "../../../components/ModalWrapper"
import MeetingDataForm from "../../../container/MeetingData"
import MeetingCard from "../../../container/MeetingCard"
import PrimaryButton from "../../../components/formElements/PrimaryButton"
import NewMeetingCard from "../../../components/NewMeetingCard"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import CancelButton from "../../../components/formElements/CancelButton"
import isEmpty from "../../../utils/isEmpty"
import NeutralButton from "../../../components/formElements/NeutralButton"
import DisplayText from "../../../components/formElements/DisplayMessage"
import Loading from "../../../components/formElements/Loading"
import { useMeetingsQuery } from "../../../generated/graphql"
import { useDeleteMeetMutation } from "../../../generated/graphql"
import Notify from "../../../utils/notify"
import { useIntl } from "react-intl"

export default function Meetings() {
  const { formatMessage } = useIntl()
  const [{ data, fetching }] = useMeetingsQuery()
  const [newMeeting, setNewMeeting] = useState(false)
  const [deleteMeeting, setDeleteMeeting] = useState(false)
  const [meetingData, setMeeting] = useState({})
  const [, getIdMeetMutation] = useDeleteMeetMutation()

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
      return Notify({
        title: "No se puede eliminar la reunión",
        type: "error",
      })
    }
    setDeleteMeeting(false)
    // window.location.reload()
    return Notify({
      title: "reunión eliminada correctamente",
      type: "success",
    })
  }

  const handleSearchField = (a: any) => {}

  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <SearchMeeting onData={handleSearchField} />
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        <NewMeetingCard
          onClick={() => {
            setMeeting({})
            setNewMeeting(true)
          }}
        />
        <ShouldRender if={data && data.meetings}>
          {data?.meetings.map(({ __typename, ...reu }) => (
            <MeetingCard
              {...reu}
              borderColor={reu.isActive === "false" ? "tomato" : "#269e39"}
            >
              <ShouldRender if={!reu.hasReservation}>
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
              </ShouldRender>
            </MeetingCard>
          ))}
        </ShouldRender>
      </Flex>
      <ModalWrapper
        titulo={
          isEmpty(meetingData)
            ? formatMessage({ id: "app.meetingForm.newMeeting" })
            : formatMessage({ id: "app.meetingForm.updateMeeting" })
        }
        contenido={
          <MeetingDataForm meeting={meetingData}>
            <NeutralButton onClick={onCloseFormMeeting} mr={3}>
              <DisplayText id="app.buttons.back" defaultMessage="back" />
            </NeutralButton>
          </MeetingDataForm>
        }
        isOpen={newMeeting}
        onClose={onCloseFormMeeting}
      />
      <ModalWrapper
        titulo={formatMessage({ id: "app.meetingForm.deleteMeeting" })}
        contenido={
          <>
            <Text>
              <DisplayText
                id="app.meetingForm.deleteMessage"
                defaultMessage="Are you sure you want to delete this meeting?"
              />
            </Text>
            <Stack spacing={3}>
              <CancelButton
                onClick={() => {
                  deleteThisMeeting(meetingData)
                }}
              >
                <DisplayText id="app.buttons.delete" defaultMessage="delete" />
              </CancelButton>
              <PrimaryButton onClick={onCloseDeleteMeeting} mr={3}>
                <DisplayText id="app.buttons.back" defaultMessage="back" />
              </PrimaryButton>
            </Stack>
          </>
        }
        isOpen={deleteMeeting}
        onClose={onCloseDeleteMeeting}
      />
    </Box>
  )
}
