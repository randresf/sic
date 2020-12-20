import { Box, Flex, Checkbox } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import Loading from "../components/formElements/Loading"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"

const MeetingDataForm = ({ children }: any) => {
  const [loading] = useState(false)
  return (
    <Box minW="300px">
      <Loading loading={loading} />
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          date: "",
          spots: 0,
        }}
        validate={(values) => {
          console.log(values)
        }}
        onSubmit={async ({ ...values }) => {
          console.log(values)
        }}
      >
        {({ isSubmitting, setValues, values }) => (
          <Form style={{ width: "100%" }}>
            <Box>
              <Flex flexDir="column" w="100%">
                <FormikInput
                  label="Titulo"
                  name="title"
                  disabled={false}
                  required
                ></FormikInput>
                <FormikInput
                  label="Fecha"
                  name="date"
                  disabled={false}
                  required
                ></FormikInput>
                <FormikInput
                  label="Cupos"
                  name="spots"
                  disabled={false}
                  required
                ></FormikInput>
                <Box mt={3}>
                  <Checkbox colorScheme="teal" defaultIsChecked>
                    Activa
                  </Checkbox>
                </Box>
                <Box mt={3}>
                  {children}
                  <PrimaryButton
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="teal"
                  >
                    continuar
                  </PrimaryButton>
                </Box>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default MeetingDataForm
