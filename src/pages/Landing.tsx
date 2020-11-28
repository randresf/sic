import React from "react"
import { Flex } from "@chakra-ui/react"
import Agenda from "../container/agenda"
import { Title } from "../components/Title"

const Landing = () => {
  return (
    <Flex flexDir="column">
      <Title />
      <Agenda />
    </Flex>
  )
}

export default Landing
