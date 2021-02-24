import React, { ReactNode } from "react"
import { Flex, HStack } from "@chakra-ui/react"

const ModalActions = ({ children }: { children: ReactNode }) => {
  return (
    <Flex alignSelf="flex-end" p="2" justifyContent="space-between">
      <HStack spacing="0.75rem">{children}</HStack>
    </Flex>
  )
}
export default ModalActions
