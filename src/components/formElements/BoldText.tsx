import React from "react"
import { Text } from "@chakra-ui/react"

export default (props: any) => (
  <Text size="md" fontWeight="500">
    {props.children}
  </Text>
)
