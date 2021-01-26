import React from "react"
import { Flex } from "@chakra-ui/react"

const DefaultContainer = ({ children }: { children: React.ReactNode }) => (
  <Flex flex={1} justifyContent="center" flexWrap="wrap">
    {children}
  </Flex>
)

export default DefaultContainer
