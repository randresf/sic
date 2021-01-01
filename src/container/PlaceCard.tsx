import { Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"

type MeetingProps = {
  id: string | number | undefined
  name: string
  address: string
  children: any
  borderColor?: string
}

const PlaceCard = ({
  id,
  name,
  address,
  children,
  borderColor = "",
}: MeetingProps) => {
  return (
    <Flex
      key={id}
      p={3}
      shadow="md"
      borderColor={borderColor}
      borderWidth={1}
      m={2}
      w="270px"
      h="170px"
      flexDir="column"
      className={MEETINGS_LIST.meetingCard}
    >
      <Heading as="h3" size="md" className={MEETINGS_LIST.meetingTitle}>
        {name}
      </Heading>
      <Text as="h3" size="md" className={MEETINGS_LIST.spots}>
        dirección: {address}
      </Text>

      <Flex flexDir="row-reverse">
        <Flex alignItems="center">{children}</Flex>
      </Flex>
    </Flex>
  )
}

export default PlaceCard
