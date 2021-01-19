import { Box } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import Heading from "../components/formElements/Heading"
import Text from "../components/formElements/Text"
import { MEETINGS_LIST } from "../ui/formIds"

type MeetingProps = {
  id: string | number | undefined
  name: string
  address: string
  children: any
  bg?: string
}

const PlaceCard = ({ id, name, address, children, bg = "" }: MeetingProps) => {
  return (
    <Card key={id} backgroundColor={bg} className={MEETINGS_LIST.meetingCard}>
      <Heading className={MEETINGS_LIST.meetingTitle}>{name}</Heading>
      <Text className={MEETINGS_LIST.spots}>dirección: {address}</Text>
      <Box alignSelf="flex-end">{children}</Box>
    </Card>
  )
}

export default PlaceCard
