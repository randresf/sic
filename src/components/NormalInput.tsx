import React from "react"
import { FormControl, FormLabel, Input } from "@chakra-ui/react"

type NormalInputProps = {
  name: string
  label: string
  type: string
  required: true | false
  onBlur: (ev: any) => void
}

const NormalInput = ({ name, label, type, ...props }: NormalInputProps) => (
  <FormControl mt={2}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input id={name} type={type} placeholder={label.toLowerCase()} {...props} />
  </FormControl>
)

export default NormalInput
