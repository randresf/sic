import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import Heading from "../components/formElements/Heading"
import Text from "../components/formElements/Text"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "../components/formElements/DisplayMessage"
import BoldText from "../components/formElements/BoldText"
import DisplayPair from "../components/DisplayPairText"

type MeetingProps = {
  id: string | number | undefined
  firstName: string
  lastName: string
  phone: string
  email: string
  username: string
  children: any
  bg?: string
}

const PlaceCard = ({
  id,
  firstName,
  lastName,
  phone,
  email,
  children,
  username,
}: MeetingProps) => {
  return (
    <Card
      key={id}
      className={MEETINGS_LIST.meetingCard}
      actions={<Box alignSelf="flex-end">{children}</Box>}
    >
      <Heading mb={3} className={MEETINGS_LIST.meetingTitle}>
        {firstName} {lastName}
      </Heading>
      <DisplayPair
        bold={<DisplayText id="form.phone" defaultMessage="Phone" />}
        text={phone}
      />
      <DisplayPair
        bold={<DisplayText id="form.email" defaultMessage="Email" />}
        text={email}
      />
      <DisplayPair
        bold={<DisplayText id="form.user" defaultMessage="User" />}
        text={username}
      />
    </Card>
  )
}

export default PlaceCard
