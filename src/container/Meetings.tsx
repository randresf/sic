import React, { useState } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import Loading from "../components/formElements/Loading"
import {
  useMeetingsQuery,
  useMeetingUpdatedSubscription,
  useNewMeetingSubscription,
  useMeetingDeleteSubscription,
} from "../generated/graphql"
import IconButton from "../components/formElements/IconButton"
import { MEETINGS_LIST } from "../ui/formIds"
import MeetingCard from "./MeetingCard"
import ShouldRender from "../components/ShouldRender"
import DisplayText from "../components/formElements/DisplayMessage"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import PrimaryButton from "../components/formElements/PrimaryButton"

const Meetings = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })
  const [{ data, fetching, error }] = useMeetingsQuery({ variables })
  useMeetingUpdatedSubscription()
  useNewMeetingSubscription()
  useMeetingDeleteSubscription()

  if (error || !data || data.meetings.meetings.length === 0)
    return (
      <Box id={MEETINGS_LIST.noMeetings}>
        <DisplayText
          id="app.meetings.empty"
          defaultMessage="no hay reuniones"
        />
      </Box>
    )
  const nextPage = {
    limit: variables.limit,
    cursor:
      data?.meetings.meetings[data.meetings.meetings.length - 1].createdAt,
  }

  return (
    <Flex flex={1} alignItems="center" flexWrap="wrap">
      <Loading loading={fetching}></Loading>
      <ShouldRender if={data && data.meetings}>
        {data?.meetings.meetings.map(({ __typename, ...reu }) => (
          <MeetingCard {...reu}>
            <Flex mt={"-15px"}>
              <Link
                to={`/datos/${reu.id}`}
                className={MEETINGS_LIST.linkCitizenForm}
              >
                <Text mr={3}>
                  <DisplayText
                    id="app.buttons.reserve"
                    defaultMessage="Reserve"
                  />
                </Text>
                <IconButton
                  className={MEETINGS_LIST.btnReserve}
                  aria-label="reservar"
                  iconType="IconReservation"
                  icon={<ArrowRightIcon />}
                />
              </Link>
            </Flex>
          </MeetingCard>
        ))}
        <ShouldRender if={data && data.meetings.hasMore}>
          <Flex>
            <PrimaryButton
              isLoading={fetching}
              mt={8}
              onClick={() => {
                setVariables(nextPage)
              }}
            >
              load more
            </PrimaryButton>
          </Flex>
        </ShouldRender>
      </ShouldRender>
    </Flex>
  )
}

export default Meetings
