import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"
import DisplayText from "../components/formElements/DisplayMessage"
import ShouldRender from "../components/ShouldRender"
import Text from "../components/formElements/Text"
import BoldText from "../components/formElements/BoldText"
import Heading from "../components/formElements/Heading"
import Card from "../components/Card"

type MeetingProps = {
  spots: number
  id: string | number | undefined
  title: string
  meetingDate: string
  children: any
  bg?: string
}

const MeetingCard = ({
  spots,
  id,
  title,
  meetingDate,
  children,
  bg,
}: MeetingProps) => {
  return (
    <Card backgroundColor={bg} className={MEETINGS_LIST.meetingCard}>
      <Flex justifyContent="left" flexWrap="wrap">
        <Heading mr={170} className={MEETINGS_LIST.meetingTitle}>
          {title}
        </Heading>
        <BoldText className={MEETINGS_LIST.meetingDate}>
          <DisplayText id="app.label.date" defaultMessage="date" />
        </BoldText>
        <Text>{formatDate(meetingDate)}</Text>

        <BoldText className={MEETINGS_LIST.spots}>
          <DisplayText id="app.label.spots" defaultMessage="spots: " />{" "}
        </BoldText>
        <Text> {spots}</Text>
      </Flex>
      <ShouldRender if={String(spots) !== "0"}>
        <Box alignSelf="flex-end">{children}</Box>
      </ShouldRender>
    </Card>
  )
}

export default MeetingCard
