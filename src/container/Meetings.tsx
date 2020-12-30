import React from "react"
import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import Loading from "../components/formElements/Loading"
import { useMeetingsQuery } from "../generated/graphql"
import { MEETINGS_LIST } from "../ui/formIds"
import MeetingCard from "./MeetingCard"
import ShouldRender from "../components/ShouldRender"
import DisplayText from "../components/formElements/DisplayMessage"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const Meetings = () => {
  const [{ data, fetching, error }] = useMeetingsQuery()
  if (fetching) return <Loading loading />
  return (
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
          <MeetingCard {...reu}>
            <Link
              to={`/datos/${reu.id}`}
              className={MEETINGS_LIST.linkCitizenForm}
            >
              <Flex alignItems="center">
                <Text mr={3}>
                  <DisplayText
                    id="app.buttons.reserve"
                    defaultMessage="Reserve"
                  />
                </Text>
                <IconButton
                  className={MEETINGS_LIST.btnReserve}
                  aria-label="reservar"
                  icon={<ArrowRightIcon />}
                />
              </Flex>
            </Link>
          </MeetingCard>
        ))}
      </ShouldRender>
    </Flex>
  )
}

export default Meetings
