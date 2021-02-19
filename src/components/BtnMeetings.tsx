import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import UpArrow from "../assets/icons/UpArrow"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "./formElements/DisplayMessage"

const BtnSearchMeetings = () => {
  const history = useHistory()
  return (
    <Flex
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      mb={10}
      onClick={() => history.replace("/meetings")}
    >
      <Heading mt={2} as="h1" size="md" id={MEETINGS_LIST.title}>
        <UpArrow />
      </Heading>
      <Heading mt={2} as="h1" size="md" id={MEETINGS_LIST.title}>
        <DisplayText id="app.buttons.reserve" defaultMessage="Reserve" />
      </Heading>
    </Flex>
  )
}

export default BtnSearchMeetings
