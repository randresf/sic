import { Checkbox } from "@chakra-ui/react"
import React from "react"
import { CheckboxPropsType } from "../types"

const CheckboxWrapper = ({
  name,
  colorScheme,
  children,
  defaultIsChecked,
  ...props
}: CheckboxPropsType) => {
  return (
    <Checkbox colorScheme={colorScheme} name={name} {...props} defaultIsChecked>
      {children}
    </Checkbox>
  )
}

export default CheckboxWrapper
