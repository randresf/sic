import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import DisplayPair from "../components/DisplayPairText"
import DisplayText from "../components/formElements/DisplayMessage"
import Heading from "../components/formElements/Heading"
import ShouldRender from "../components/ShouldRender"
import { MEETINGS_LIST } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"

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
