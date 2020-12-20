import { PlusSquareIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"
import IconButton from "./formElements/IconButton"

export default function NewMeetingCard(props: any) {
  return (
    <Flex
      p={3}
      shadow="md"
      border="dashed"
      borderWidth={1}
      m={2}
      w="270px"
      h="170px"
      flexDir="column"
      className={MEETINGS_LIST.meetingCard}
    >
      <IconButton
        height="100%"
        id={MEETINGS_LIST.btnNewMeeting}
        aria-label="newMeeting"
        background="none"
        fontSize="50px"
        color="#868585"
        onClick={props?.onClick}
        icon={<PlusSquareIcon />}
      />
    </Flex>
  )
}
