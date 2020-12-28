import React from "react"
import { SelectControl } from "formik-chakra-ui"
import { FormLabel, FormControl } from "@chakra-ui/react"

const Select = ({
  options,
  id,
  label,
  name,
  placeholder = "select",
  ...props
}: any) => {
  return (
    <FormControl mt={2}>
      <FormLabel id={`lbl-${id}`} htmlFor={id} {...props}>
        {label}
      </FormLabel>
      <SelectControl id={id} name={name} selectProps={{ placeholder }} m={0}>
        {options?.map(({ id, name }: any) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </SelectControl>
    </FormControl>
  )
}

export default Select
