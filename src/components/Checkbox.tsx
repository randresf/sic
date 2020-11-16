import { Checkbox } from "@chakra-ui/react"
import React from "react"

const CheckboxWrapper = ({ color = "green", text, ...props }) => {
  return (
    <Checkbox colorScheme={color} {...props}>
      {text}
    </Checkbox>
  )
}

export default CheckboxWrapper
