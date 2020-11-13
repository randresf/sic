import React from "react"
import Input from "../components/Input"
import Wrapper from "../components/Wrapper"
import PrimaryButton from "../components/PrimaryButton"
import DatePicker from "../components/DatePicker"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { Formik } from "formik"

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
            const errors = {}
            // if (!values.email) {
            //   errors.email = "Required"
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = "Invalid email address"
            // }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values)
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting }) => (
            <form>
              <Box>
                <Flex flexDir="column" flexGrow="">
                  <Input placeholder="Cedula" name="cedula" type="number" />
                  <Input placeholder="Nombres" name="nombre" />
                  <Input placeholder="Apellidos" name="apellido" />
                  <Input placeholder="Telefono" name="telefono" />
                  <Input placeholder="Correo" name="correo" />
                  <DatePicker name="date" />
                  <Box>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
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
