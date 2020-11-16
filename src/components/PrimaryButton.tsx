import React from "react"
import { Button } from "@chakra-ui/react"

const WrapperButton = ({ children, ...rest }) => (
  <Button {...rest}>{children}</Button>
)

export default WrapperButton
