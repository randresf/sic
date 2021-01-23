import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import ShouldRender from "../../../components/ShouldRender"
import ModalWrapper from "../../../components/ModalWrapper"
import MeetingDataForm from "../../../container/MeetingData"
import MeetingCard from "../../../container/MeetingCard"
import PrimaryButton from "../../../components/formElements/PrimaryButton"
import AddCard from "../../../components/AddCard"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import CancelButton from "../../../components/formElements/CancelButton"
import isEmpty from "../../../utils/isEmpty"
import NeutralButton from "../../../components/formElements/NeutralButton"
import DisplayText from "../../../components/formElements/DisplayMessage"
import Loading from "../../../components/formElements/Loading"
import IconButton from "../../../components/formElements/IconButton"
import {
  useMeetingDeleteSubscription,
  useMeetingsQuery,
} from "../../../generated/graphql"
import { useDeleteMeetMutation } from "../../../generated/graphql"
import Notify from "../../../utils/notify"
import { useIntl } from "react-intl"
import { ACTIVE_CARD_COLOR, INACTIVE_CARD_COLOR } from "../../../constants"
import { v4 } from "uuid"

export default function Meetings() {
  const { formatMessage } = useIntl()
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })
  const [{ data, fetching }] = useMeetingsQuery({ variables })
  const [newMeeting, setNewMeeting] = useState(false)
  const [deleteMeeting, setDeleteMeeting] = useState(false)
  const [meetingData, setMeeting] = useState({})
  const [, getIdMeetMutation] = useDeleteMeetMutation()

  useMeetingDeleteSubscription()

  const onCloseFormMeeting = () => {
    setNewMeeting(false)
  }

  const onCloseDeleteMeeting = () => {
    setDeleteMeeting(false)
  }

  const deleteThisMeeting = async (meeting: any) => {
    if (isEmpty(meeting)) return
    const res = await getIdMeetMutation({ meetingId: meeting.id })
    if (res.error) {
      setDeleteMeeting(false)
      return Notify({
        title: res.error.message,
        type: "error",
      })
    }
    if (res.data?.deleteMeeting.errors) {
      setDeleteMeeting(false)
      return Notify({
        title: formatMessage({ id: "app.notification.cantDeleteMeet" }),
        type: "error",
      })
    }
    setDeleteMeeting(false)

    return Notify({
      title: formatMessage({ id: "app.notification.deleteMeet" }),
      type: "success",
    })
  }

  return (
    <>
      <Flex justifyContent="center" flexWrap="wrap">
        <Loading loading={fetching}>
          <AddCard
            onClick={() => {
              setMeeting({})
              setNewMeeting(true)
            }}
          />
        </Loading>
        <ShouldRender if={data && data.meetings.meetings}>
          {data?.meetings.meetings.map(({ __typename, ...reu }) => (
            <MeetingCard
              {...reu}
              bg={
                reu.isActive === "false"
                  ? INACTIVE_CARD_COLOR
                  : ACTIVE_CARD_COLOR
              }
              key={v4()}
            >
              <IconButton
                onClick={() => {
                  setMeeting(reu)
                  setDeleteMeeting(true)
                }}
                mr={2}
                aria-label="eliminar"
                iconType="IconDelete"
                icon={<DeleteIcon />}
              />
              <IconButton
                onClick={() => {
                  setMeeting(reu)
                  setNewMeeting(true)
                }}
                aria-label="editar"
                iconType="IconEdit"
                icon={<EditIcon />}
              />
            </MeetingCard>
          ))}
        </ShouldRender>
        {data?.meetings.hasMore ? (
          <Flex>
            <PrimaryButton
              isLoading={fetching}
              mt={8}
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.meetings.meetings[data.meetings.meetings.length - 1]
                      .createdAt,
                })
              }}
            >
              load more
            </PrimaryButton>
          </Flex>
        ) : null}
      </Flex>
      <ModalWrapper
        titulo={formatMessage({ id: "app.meetingForm.deleteMeeting" })}
        contenido={
          <Text>
            <DisplayText
              id="app.meetingForm.deleteMessage"
              defaultMessage="Are you sure you want to delete this meeting?"
            />
          </Text>
        }
        actions={
          <>
            <CancelButton
              onClick={() => {
                deleteThisMeeting(meetingData)
              }}
            >
              <DisplayText id="app.buttons.delete" defaultMessage="delete" />
            </CancelButton>
            <PrimaryButton onClick={onCloseDeleteMeeting}>
              <DisplayText id="app.buttons.back" defaultMessage="back" />
            </PrimaryButton>
          </>
        }
        isOpen={deleteMeeting}
        onClose={onCloseDeleteMeeting}
      />
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
    </>
  )
}
