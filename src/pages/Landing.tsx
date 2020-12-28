import React from "react"
import { Flex } from "@chakra-ui/react"
import Meetings from "../container/Meetings"
import { Title } from "../components/Title"

const Landing = () => {
  return (
    <Flex flexDir="column">
      <Title />
      <Meetings />
    </Flex>
  )
}

export default Landing
