import React from "react"
import { useFormikContext } from "formik"
import { Field } from "formik"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react"
import { FormikType } from "../types"

type Props = {
  name: string,
  label: string
}

const DatePickerField = ({ name, label, ...props }: Props) => {
  const { setFieldValue } = useFormikContext()
  return (
    <Field name={name}>
      {({ field, form }: FormikType) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input
            {...field}
            {...props}
            type="date"
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
