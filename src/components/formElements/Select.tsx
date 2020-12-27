import React from "react"
import { SelectControl } from "formik-chakra-ui"
import { FormLabel, FormControl } from "@chakra-ui/react"

const Select = ({ place, id, label, ...props }: any) => {
  return (
    <FormControl mt={2}>
      <FormLabel id={`lbl-${id}`} htmlFor={id} {...props}>
        {label}
      </FormLabel>
      <SelectControl
        id={id}
        name="place"
        selectProps={{ placeholder: "Seleccione el lugar" }}
        m={0}
      >
        {place?.map(({ id, name }: any) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </SelectControl>
    </FormControl>
  )
}

export default Select
