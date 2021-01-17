import React from "react"
import { Text } from "@chakra-ui/react"

const BoldText = (props: any) => (
  <Text size="md" fontWeight="500">
    {props.children}
  </Text>
)
export default BoldText
