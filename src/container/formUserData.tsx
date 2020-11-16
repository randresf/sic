import React from "react"
import FormikInput from "../components/FormikInput"
import Wrapper from "../components/Wrapper"
import PrimaryButton from "../components/PrimaryButton"
import DatePicker from "../components/DatePicker"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import isPersonalDataValid from "../utils/isPersonalDataValid"

const DatosPersonales = () => {
  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading>Datos Personales</Heading>
        <Formik
          initialValues={{
            cedula: "",
            nombre: "",
            apellido: "",
            telefono: "",
            correo: "",
            date: ""
          }}
          validate={(values) => {
            const errors = isPersonalDataValid(values)
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Box>
                <Flex flexDir="column" w="100%">
                  <FormikInput label="Cedula" name="cedula" type="number" />
                  <FormikInput label="Nombres" name="nombre" />
                  <FormikInput label="Apellidos" name="apellido" />
                  <FormikInput label="Telefono" name="telefono" type="number" />
                  <FormikInput label="Correo" name="correo" />
                  <DatePicker
                    label="Fecha de nacimiento"
                    name="date"
                    type="date"
                  />
                  <Box mt={3}>
                    <PrimaryButton
                      type="submit"
                      //disabled={error}
                      isLoading={isSubmitting}
                    >
                      Submit
                    </PrimaryButton>
                  </Box>
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
      </Flex>
    </Wrapper>
  )
}

export default DatosPersonales
