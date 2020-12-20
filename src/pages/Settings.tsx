import React, { useState } from "react"
import { Box, Flex, Heading } from "@chakra-ui/react"
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
import DisplayText from "../components/formElements/DisplayMessage"

const Settings = () => {
  const [{ data, fetching, error }] = useMeetingsQuery()
  const [newMeeting, setNewMeeting] = useState(false)

  const onClose = () => {
    setNewMeeting(false)
  }

  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <Heading as="h2" size="md" id={MEETINGS_LIST.title}>
        Eventos:
      </Heading>
      <SearchMeeting />
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        <ShouldRender if={error || !data || data.meetings?.length === 0}>
          <div id={MEETINGS_LIST.noMeetings}>
            <DisplayText
              id="app.meetings.empty"
              defaultMessage="no hay reuniones"
            />
          </div>
        </ShouldRender>
        {/* validar como usar en el punto map RenderMeetings */}
        <ShouldRender if={data && data.meetings}>
          {data?.meetings.map(({ __typename, ...reu }) => (
            <RenderMeetings {...reu} admin={true} />
          ))}
        </ShouldRender>
        <NewMeetingCard
          onClick={() => {
            setNewMeeting(true)
          }}
        />
      </Flex>
      <ModalWrapper
        titulo="Nueva reunion"
        contenido={
          <MeetingDataForm>
            <PrimaryButton onClick={onClose} mr={3}>
              volver
            </PrimaryButton>
          </MeetingDataForm>
        }
        isOpen={newMeeting}
        onClose={onClose}
      />
    </Box>
  )
}

export default Settings
