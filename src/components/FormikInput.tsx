import React from "react"
import { Field } from "formik"
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { FormikType } from "./types"

const WrapperInput = ({ type = "text", name = '', label = '', ...props }) => {
  return !name ? null : (
    <Field name={name}>
      {({ field, form }: FormikType) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={name.toLowerCase()}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default WrapperInput
