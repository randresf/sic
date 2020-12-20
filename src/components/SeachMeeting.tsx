import { Box, Flex, InputGroup } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import FormikInput from "./formElements/FormikInput"
const SearchMeeting = () => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        document: "",
      }}
      validate={(values) => {}}
      onSubmit={async ({ ...values }) => {}}
    >
      {({ isSubmitting, setValues, values }) => (
        <Form>
          <Box>
            <InputGroup>
              <Flex flexDir="row" align="flex-end" w="40%">
                <FormikInput label="Buscar" name="buscar" required />
              </Flex>
            </InputGroup>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default SearchMeeting
