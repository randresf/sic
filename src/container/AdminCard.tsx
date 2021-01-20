import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import Card from "../components/Card"
import Heading from "../components/formElements/Heading"
import Text from "../components/formElements/Text"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "../components/formElements/DisplayMessage"
import BoldText from "../components/formElements/BoldText"

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
    <Card key={id} className={MEETINGS_LIST.meetingCard}>
      <Flex
        textAlign="left"
        justifyContent="left"
        flexWrap="wrap"
        flexDir="column"
      >
        <Heading className={MEETINGS_LIST.meetingTitle}>
          {firstName} {lastName}
        </Heading>
        <Flex>
          <BoldText className={MEETINGS_LIST.meetingCard}>
            <DisplayText id="form.phone" defaultMessage="Phone" /> :{" "}
          </BoldText>
          <Text> {` ${phone}`}</Text>
        </Flex>
        <Flex>
          <BoldText className={MEETINGS_LIST.spots}>
            <DisplayText id="form.email" defaultMessage="Email" /> :{" "}
          </BoldText>
          <Text> {` ${email}`}</Text>
        </Flex>
        <Flex>
          <BoldText className={MEETINGS_LIST.spots}>
            <DisplayText id="form.user" defaultMessage="User" /> :{" "}
          </BoldText>
          <Text> {` ${username}`}</Text>
        </Flex>
      </Flex>

      <Box alignSelf="flex-end">{children}</Box>
    </Card>
  )
}

export default PlaceCard
