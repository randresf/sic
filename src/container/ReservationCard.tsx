import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import DisplayPair from "../components/DisplayPairText"
import DisplayText from "../components/formElements/DisplayMessage"
import Heading from "../components/formElements/Heading"
import { RESERVATIONS_LIST } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"

const ReservationCard = ({ id, meeting, children }: any) => {
  console.log(meeting)
  const { title, meetingDate } = meeting
  return (
    <Card
      id={id}
      className={RESERVATIONS_LIST.title}
      actions={<Box alignSelf="flex-end">{children}</Box>}
    >
      <Flex justifyContent="left" flexWrap="wrap" flexDir="column">
        <Heading mb={3} className={RESERVATIONS_LIST.meetingTitle}>
          {title}
        </Heading>
        <DisplayPair
          bold={<DisplayText id="app.label.date" defaultMessage="date" />}
          text={formatDate(meetingDate)}
        />
      </Flex>
    </Card>
  )
}

export default ReservationCard
