import React from "react"
import Wrapper from "../components/Wrapper"
import { Box, Flex, Heading } from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import YesNoRadioGroup from "../components/YesNoRadioGroup"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"

const Question = () => {
  const [value, setValue] = React.useState({})
  const [error, setError] = React.useState(false)

  const onRadioGroupChange = function (questionId: number) {
    return function updateQuestionValue(radioValue: string) {
      validate()
      setValue({ ...value, [questionId]: radioValue })
    }
  }

  const validate = () => {
    const q = Object.entries(value).find(([key, value]) =>
      value === "1" ? key : null
    )
    if (q && q[0]) {
      setError(true)
    }
  }

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
          onSubmit={() => {}}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Box m={4} style={{ textAlign: "center" }}>
                {AVISO_PROTECCION_DATOS}
              </Box>
              <Box>
                <Flex flexDir="column" w="100%">
                  {QUESTIONS &&
                    QUESTIONS.map((prg) => (
                      <YesNoRadioGroup
                        key={prg.id}
                        text={prg.question}
                        onChange={onRadioGroupChange(prg.id)}
                        name="pregunta"
                      />
                    ))}
                  <Box mt={3}>
                    <PrimaryButton
                      type="submit"
                      isDisabled={error}
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
