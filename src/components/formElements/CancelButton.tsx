import React from "react"
import { Button } from "@chakra-ui/react"

const CancelButton = ({ children, ...rest }: any) => (
  <Button size="md" height="48px" colorScheme="red" variant="outline" {...rest}>
    {children}
  </Button>
)

export default CancelButton
