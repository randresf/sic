import React from "react"
import FormikInput from "../components/FormikInput"
import Wrapper from "../components/Wrapper"
import PrimaryButton from "../components/PrimaryButton"
import DatePicker from "../components/DatePicker"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { Formik } from "formik"
import { ValideFields } from "../utils/noMeAcuerdo"

const DatosPersonales = () => {
  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={2} flexDir="column">
        <Heading>Datos Personales</Heading>
        <Formik
          initialValues={{
            cedula: "",
            nombre: "",
            apellido: "",
            telefono: "",
            correo: "",
          }}
          validate={(values) => {
            const errors = ValideFields(values)
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ isSubmitting }) => (
            <form>
              <Box>
                <Flex flexDir="column" flexGrow="">
                  <FormikInput label="Cedula" name="cedula" type="number" />
                  <FormikInput label="Nombres" name="nombre" />
                  <FormikInput label="Apellidos" name="apellido" />
                  <FormikInput label="Telefono" name="telefono" type="number" />
                  <FormikInput label="Correo" name="correo" />
                  <DatePicker label="Fecha de nacimiento" name="date" />
                  <Box>
                    <PrimaryButton
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Submit
                    </PrimaryButton>
                  </Box>
                </Flex>
              </Box>
            </form>
          )}
        </Formik>
      </Flex>
    </Wrapper>
  )
}

export default DatosPersonales
