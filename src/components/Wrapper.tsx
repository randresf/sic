import { Flex } from "@chakra-ui/react"
import React from "react"

type wrapper = {
  children: "" | React.ReactNode
}

const Wrapper = ({ children }: wrapper) => {
  return (
    <Flex
      alignItems="flex-start"
      width={["90%", "90%", "100%"]}
      ml={["75px", "75px", "0px"]}
      p={4}
      minHeight="85vh"
    >
      {children}
    </Flex>
  )
}

export default Wrapper
