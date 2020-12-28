import React from "react"
import { Button } from "@chakra-ui/react"

const PrimaryButton = ({ children, ...rest }: any) => (
  <Button size="md" height="48px" colorScheme="teal" {...rest}>
    {children}
  </Button>
)

export default PrimaryButton
