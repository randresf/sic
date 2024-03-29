import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react"
import { Field } from "formik"
import React from "react"
import { FormikType } from "../types"

const WrapperInput = ({
  type = "text",
  name = "",
  label = "",
  placeholder = "",
  id = "",
  ...props
}) => {
  return !name ? null : (
    <Field name={name}>
      {({ field, form }: FormikType) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]} mt={2}>
          <FormLabel id={`lbl-${id}`} htmlFor={id} {...props}>
            {label}
          </FormLabel>
          <Input
            {...field}
            type={type}
            placeholder={placeholder || label.toLowerCase()}
            {...props}
            id={id}
            data-qa={`${name}-field`}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default WrapperInput
