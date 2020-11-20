import React from "react"
import { Field } from "formik"
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react"
import { FormikType } from "./types"

const WrapperInput = ({
  type = "text",
  name = "",
  label = "",
  placeholder = "",
  ...props
}) => {
  return !name ? null : (
    <Field name={name}>
      {({ field, form }: FormikType) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} mt={2}>
          <FormLabel htmlFor={name} {...props}>
            {label}
          </FormLabel>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder || label.toLowerCase()}
            {...props}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default WrapperInput
