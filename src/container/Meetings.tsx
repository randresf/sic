import React, { useState } from "react"
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import Loading from "../components/formElements/Loading"
import { useMeetingsQuery } from "../generated/graphql"
import { MEETINGS_LIST } from "../ui/formIds"
import RenderMeetings from "./MeetingCard"
import ShouldRender from "../components/ShouldRender"
import ReservationSection from "./ReservationSection"
import DisplayText from "../components/formElements/DisplayMessage"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import PrimaryButton from "../components/formElements/PrimaryButton"
import NeutralButton from "../components/formElements/NeutralButton"

const Meetings = () => {
  const [showInput, setInput] = useState(false)
  const [{ data, fetching, error }] = useMeetingsQuery()

  const btnsProps = {
    onClick: () => {
      setInput(!showInput)
    },
    mt: 5,
    id: MEETINGS_LIST.searchOrClean,
  }

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
            <RenderMeetings {...reu}>
              <Link
                to={`/datos/${reu.id}`}
                className={MEETINGS_LIST.linkCitizenForm}
              >
                <Flex alignItems="center">
                  <Text mr={3}>Reservar</Text>
                  <IconButton
                    className={MEETINGS_LIST.btnReserve}
                    aria-label="reservar"
                    icon={<ArrowRightIcon />}
                  />
                </Flex>
              </Link>
            </RenderMeetings>
          ))}
        </ShouldRender>
      </Flex>

      {showInput ? (
        <NeutralButton {...btnsProps}>
          <DisplayText id="app.buttons.back" defaultMessage="volver" />
        </NeutralButton>
      ) : (
        <PrimaryButton {...btnsProps}>
          <DisplayText
            id="app.buttons.searchReservation"
            defaultMessage="consultar reservas"
          />
        </PrimaryButton>
      )}
      <ShouldRender if={showInput}>
        <ReservationSection showIcon />
      </ShouldRender>
    </Box>
  )
}

export default Meetings
