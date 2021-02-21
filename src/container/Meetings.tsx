import React, { useState } from "react"
import { Flex, Spinner, Text } from "@chakra-ui/react"
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
import ShadowBox from "../components/ShadowBox"

const Meetings = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })
  const [{ data, fetching, error }] = useMeetingsQuery({ variables })
  useMeetingUpdatedSubscription()
  useNewMeetingSubscription()
  useMeetingDeleteSubscription()

  if (fetching) return <Spinner />

  if (error || !data || data.meetings.meetings.length === 0)
    return (
      <ShadowBox>
        <Flex
          id={MEETINGS_LIST.noMeetings}
          alignItems="center"
          w="100%"
          height="500px"
          justifyContent="center"
        >
          <DisplayText
            id="app.meetings.empty"
            defaultMessage="no hay reuniones"
          />
        </Flex>
      </ShadowBox>
    )
  const nextPage = {
    limit: variables.limit,
    cursor:
      data?.meetings.meetings[data.meetings.meetings.length - 1].createdAt,
  }

  return (
    <ShadowBox>
      <ShouldRender if={data && data.meetings}>
        <Flex flexDir={["column", "column", "row"]}>
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
        </Flex>
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
    </ShadowBox>
  )
}

export default Meetings
