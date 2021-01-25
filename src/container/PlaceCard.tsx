import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import Heading from "../components/formElements/Heading"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "../components/formElements/DisplayMessage"
import DisplayPair from "../components/DisplayPairText"

type MeetingProps = {
  id: string | number | undefined
  name: string
  address: string
  children: any
  bg?: string
}

const PlaceCard = ({ id, name, address, children, bg = "" }: MeetingProps) => {
  return (
    <Card
      key={id}
      className={MEETINGS_LIST.meetingCard}
      actions={<Box alignSelf="flex-end">{children}</Box>}
    >
      <Heading mb={3} className={MEETINGS_LIST.meetingTitle}>
        {name}
      </Heading>
      <DisplayPair
        bold={<DisplayText id="form.address" defaultMessage="address" />}
        text={address}
      />
    </Card>
  )
}

export default PlaceCard
