import React from "react"
import { Field, ErrorMessage } from "formik"
import { Box, Input } from "@chakra-ui/react"

const WrapperInput = ({ type = "text", name, ...props }) => {
  return (
    <Box m={2}>
      <Field type={type} name={name} {...props} component={Input} />
      <ErrorMessage name={name} component="div" />
    </Box>
  )
}

export default WrapperInput
