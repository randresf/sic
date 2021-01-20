import React from "react"
import { Box } from "@chakra-ui/react"

const BoldText = (props: any) => (
  <Box as="h3" fontWeight="bold">
    {props.children}
  </Box>
)
export default BoldText
