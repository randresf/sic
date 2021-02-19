import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import DownArrow from "../assets/icons/DownArrow"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "./formElements/DisplayMessage"

const BtnSearchReservation = () => {
  const history = useHistory()
  return (
    <Flex
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      onClick={() => history.replace("/reservations")}
    >
      <Heading mt={10} as="h1" size="md" id={MEETINGS_LIST.title}>
        <DisplayText
          id="app.buttons.searchReservation"
          defaultMessage="Search reservations"
        />
      </Heading>
      <Heading mt={2} as="h1" size="md" id={MEETINGS_LIST.title}>
        <DownArrow />
      </Heading>
    </Flex>
  )
}

export default BtnSearchReservation
