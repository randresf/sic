import { Flex } from "@chakra-ui/react"
import React from "react"

type wrapper = {
  children: "" | React.ReactNode
}

const Wrapper = ({ children }: wrapper) => {
  return (
    <Flex alignItems="flex-start" w="100%" p={4}>
      {children}
    </Flex>
  )
}

export default Wrapper
