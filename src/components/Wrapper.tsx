import { Flex } from "@chakra-ui/react"
import React from "react"

type wrapper = {
  children: "" | React.ReactNode
}

const Wrapper = ({ children, ...props }: wrapper) => {
  return (
    <Flex
      direction="column"
      //align="center"
      maxW={{ xl: "1700px" }}
      m="0 auto"
      {...props}
    >
      {children}
    </Flex>
  )
}

export default Wrapper
