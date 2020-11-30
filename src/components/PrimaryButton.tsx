import React from "react"
import { Button } from "@chakra-ui/react"

const WrapperButton = ({ children = "", ...rest }) => (
  <Button width="110px" size="md" height="48px" {...rest}>
    {children}
  </Button>
)

export default WrapperButton
