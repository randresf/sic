import React from "react"
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import Meetings from "../pages/Dashboard/tabs/Meetings"

const Reservations = () => {
  return (
    <Flex flexDir="column">
      <InputGroup w="25%">
        <Input placeholder="Cedula" />
        <InputRightElement children={<Search2Icon color="#3e4685" />} />
      </InputGroup>
      <Flex flexDir="column">
        <Flex
          mt={5}
          border="1px solid #606060 "
          flex={1}
          alignItems="center"
          flexWrap="wrap"
        >
          <Meetings />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Reservations
