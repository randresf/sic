import React from "react"
import { Flex } from "@chakra-ui/react"
const Card = (props: any) => (
  <Flex
    {...props}
    p={3}
    shadow="md"
    borderWidth={1}
    m={2}
    w="270px"
    h="170px"
    flexDir="column"
    justifyContent="space-between"
  >
    {props.children}
  </Flex>
)
export default Card