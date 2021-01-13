import { Box, Heading } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import Text from "../components/formElements/Text"
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
    <Card
      key={id}
      borderColor={borderColor}
      className={MEETINGS_LIST.meetingCard}
    >
      <Heading as="h3" size="md" className={MEETINGS_LIST.meetingTitle}>
        {name}
      </Heading>
      <Text className={MEETINGS_LIST.spots}>dirección: {address}</Text>
      <Box alignSelf="flex-end">{children}</Box>
    </Card>
  )
}

export default PlaceCard
