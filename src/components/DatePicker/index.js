import React from "react"
import { useFormikContext } from "formik"
import DatePicker from "react-datepicker"
import { Field } from "formik"
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"

import "react-datepicker/dist/react-datepicker.css"

const DatePickerField = ({ name, label, ...props }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
              setFieldValue(field.name, val)
            }}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default DatePickerField
