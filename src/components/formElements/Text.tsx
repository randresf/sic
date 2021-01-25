import React from "react"
import { Text as ChText } from "@chakra-ui/react"
const Text = (props: any) => (
  <ChText size="md" {...props} title={props.children}>
    {props.children}
  </ChText>
)
export default Text
