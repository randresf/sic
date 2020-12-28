import { Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"

type MeetingProps = {
  spots: number
  id: string | number | undefined
  title: string
  meetingDate: string
  children: any
}

const MeetingCard = ({
  spots,
  id,
  title,
  meetingDate,
  children,
}: MeetingProps) => {
  return (
    <Flex
      key={id}
      p={3}
      shadow="md"
      borderWidth={1}
      m={2}
      w="270px"
      h="170px"
      flexDir="column"
      className={MEETINGS_LIST.meetingCard}
    >
      <Heading as="h3" size="md" className={MEETINGS_LIST.meetingTitle}>
        {title}
      </Heading>
      <Text as="h3" size="md" className={MEETINGS_LIST.meetingDate}>
        fecha: {formatDate(meetingDate)}
      </Text>
      <Text as="h3" size="md" className={MEETINGS_LIST.spots}>
        cupos: {spots}
      </Text>
      {String(spots) !== "0" && (
        <Flex flexDir="row-reverse">
          <Flex alignItems="center">{children}</Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default MeetingCard
