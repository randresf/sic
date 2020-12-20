import { Checkbox } from "@chakra-ui/react"
import React from "react"
import { CheckboxPropsType } from "../types"

const CheckboxWrapper = ({
  color = "green",
  text,
  ...props
}: CheckboxPropsType) => {
  return (
    <Checkbox colorScheme={color} {...props}>
      {text}
    </Checkbox>
  )
}

export default CheckboxWrapper
