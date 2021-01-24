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
  name: string
  address: string
  children: any
  bg?: string
}

const PlaceCard = ({ id, name, address, children, bg = "" }: MeetingProps) => {
  return (
    <Card key={id} className={MEETINGS_LIST.meetingCard}>
      <Flex
        textAlign="left"
        justifyContent="left"
        flexWrap="wrap"
        flexDir="column"
      >
        <Heading className={MEETINGS_LIST.meetingTitle}>{name}</Heading>
        <Flex>
          <BoldText className={MEETINGS_LIST.spots}>
            <DisplayText id="form.address" defaultMessage="address"/>:{" "}
          </BoldText>
          <Text> {` ${address}`}</Text>
        </Flex>
      </Flex>
      <Box alignSelf="flex-end">{children}</Box>
    </Card>
  )
}

export default PlaceCard
