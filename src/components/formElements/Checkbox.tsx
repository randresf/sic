import { Checkbox } from "@chakra-ui/react"
import React from "react"
import { CheckboxPropsType } from "../types"

const CheckboxWrapper = ({ children, type, ...props }: CheckboxPropsType) => {
  return <Checkbox {...props}>{children}</Checkbox>
}

export default CheckboxWrapper
