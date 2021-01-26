import { Box, Flex, useStyleConfig } from "@chakra-ui/react"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"
import DisplayText from "../components/formElements/DisplayMessage"
import ShouldRender from "../components/ShouldRender"
import Heading from "../components/formElements/Heading"
import Card from "../components/Card"
import { ACTIVE_CARD_COLOR } from "../constants"
import DisplayPair from "../components/DisplayPairText"

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
    <Card
      id={id}
      className={MEETINGS_LIST.meetingCard}
      actions={
        <ShouldRender if={String(spots) !== "0"}>
          <Box alignSelf="flex-end">{children}</Box>
        </ShouldRender>
      }
    >
      <Flex justifyContent="left" flexWrap="wrap" flexDir="column">
        <Heading mb={3} className={MEETINGS_LIST.meetingTitle}>
          {title}
        </Heading>
        <DisplayPair
          bold={<DisplayText id="app.label.date" defaultMessage="date" />}
          text={formatDate(meetingDate)}
        />
        <DisplayPair
          bold={<DisplayText id="app.label.spots" defaultMessage="spots" />}
          text={String(spots)}
        />
      </Flex>
    </Card>
  )
}

export default MeetingCard
