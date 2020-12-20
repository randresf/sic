import React, { useState } from "react"
import { Box, Button, Flex, Heading } from "@chakra-ui/react"
import Loading from "../components/formElements/Loading"
import { useMeetingsQuery } from "../generated/graphql"
import { MEETINGS_LIST } from "../ui/formIds"
import RenderMeetings from "./RenderMeetings"
import ShouldRender from "../components/ShouldRender"
import ReservationSection from "./ReservationSection"
import DisplayText from "../components/formElements/DisplayMessage"

const Agenda = () => {
  const [showInput, setInput] = useState(false)
  const [{ data, fetching, error }] = useMeetingsQuery()

  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <Heading as="h2" size="md" id={MEETINGS_LIST.title}>
        <DisplayText
          id="app.meetings.title"
          defaultMessage="Próximos eventos:"
        />
      </Heading>
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        <ShouldRender if={error || !data || data.meetings?.length === 0}>
          <Box id={MEETINGS_LIST.noMeetings}>
            <DisplayText
              id="app.meetings.empty"
              defaultMessage="no hay reuniones"
            />
          </Box>
        </ShouldRender>
        <ShouldRender if={data && data.meetings}>
          {data?.meetings.map(({ __typename, ...reu }) => (
            <RenderMeetings {...reu} admin={false} />
          ))}
        </ShouldRender>
      </Flex>
      <Button
        colorScheme={showInput ? "gray" : "teal"}
        onClick={() => {
          setInput(!showInput)
        }}
        mt={5}
        id={MEETINGS_LIST.searchOrClean}
      >
        {showInput ? (
          <DisplayText id="app.buttons.back" defaultMessage="volver" />
        ) : (
          <DisplayText
            id="app.buttons.searchReservation"
            defaultMessage="consultar reservas"
          />
        )}
      </Button>
      <ShouldRender if={showInput}>
        <ReservationSection showIcon />
      </ShouldRender>
    </Box>
  )
}

export default Agenda
