import React from "react"
import { Flex, Heading } from "@chakra-ui/react"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "./formElements/DisplayMessage"

export const Title = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    flexDir="column"
    mt={2}
    mb={2}
  >
    <Heading as="h1" size="3xl" id={MEETINGS_LIST.topTitle}>
      <DisplayText id="app.reservation.title" defaultMessage="Welcome" />
    </Heading>
    <Heading mt={4} as="h3" size="md" id={MEETINGS_LIST.topTitle}>
      <DisplayText
        id="app.subTitle"
        defaultMessage="Reserve space for your next meetings"
      />
    </Heading>
  </Flex>
)
