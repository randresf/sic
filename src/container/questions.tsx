import React from "react"
import Wrapper from "../components/Wrapper"
import { Box, Flex, Heading } from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import RadioGroup from "../components/RadioGroup"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"

const Question = () => {
  const [value, setValue] = React.useState({})

  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading>Formulario salud</Heading>
        <Formik
          initialValues={{
            id: "",
            pregunta: "",
            respuesta: "",
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Box m={4} style={{ textAlign: "center" }}>
                {AVISO_PROTECCION_DATOS}
              </Box>
              <Box>
                <Flex flexDir="column" w="100%">
                  {QUESTIONS && QUESTIONS.map(crearPregunta)}
                  <Box mt={3}>
                    <PrimaryButton
                      type="submit"
                      isDisabled
                      isLoading={isSubmitting}
                    >
                      Continuar
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

export default Question

const crearPregunta = (prg: { id: number; question: string }) => {
  return <RadioGroup question={prg.question} id={prg.id}></RadioGroup>
}
