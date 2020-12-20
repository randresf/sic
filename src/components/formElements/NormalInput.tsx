import React from "react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react"

type NormalInputProps = {
  name: string
  label: string
  id: string
  required: true | false
  onBlur: any
  onChange: any
  disabled: true | false
}

const NormalInput = ({ name, label, id, ...props }: NormalInputProps) => (
  <FormControl mt={2}>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <Input id={id} placeholder={label.toLowerCase()} {...props} />
  </FormControl>
)

export default NormalInput
