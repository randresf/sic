import React from "react"
import { Button } from "@chakra-ui/react"

const NeutralButton = ({ children, ...rest }: any) => (
  <Button
    size="md"
    height="48px"
    colorScheme="black"
    variant="outline"
    {...rest}
  >
    {children}
  </Button>
)

export default NeutralButton
