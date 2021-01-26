import React from "react"
import { Flex, Heading } from "@chakra-ui/react"
import { MEETINGS_LIST } from "../ui/formIds"
import DisplayText from "./formElements/DisplayMessage"

export const Title = () => (
  <Flex
    justifyItems="flex-start"
    justifyContent="center"
    flexDir="column"
    mt={2}
    mb={2}
  >
    <Heading as="h3" size="md" id={MEETINGS_LIST.topTitle}>
      <DisplayText id="app.title" defaultMessage="app title" />
    </Heading>
  </Flex>
)
