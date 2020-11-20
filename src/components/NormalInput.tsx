import React from "react"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"

type NormalInputProps = {
  name: string
  label: string
  type: string
  onBlur: (ev: any) => void
}

const NormalInput = ({ name, label, type, ...props }: NormalInputProps) => (
  <FormControl mt={2}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <Input id={name} type={type} placeholder={name.toLowerCase()} {...props} />
  </FormControl>
)

export default NormalInput
