import React from "react"
import { useFormikContext } from "formik"
import { Field } from "formik"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react"

const DatePickerField = ({ name, label, ...props }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            {...props}
            selected={field.value || ""}
            onChange={(val) => {
              setFieldValue(field.name, val.target.value)
            }}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default DatePickerField
