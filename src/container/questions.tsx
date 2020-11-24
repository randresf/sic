import React from "react"
import Wrapper from "../components/Wrapper"
import { Box, Flex, Heading, useToast, Text } from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import YesNoRadioGroup from "../components/YesNoRadioGroup"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"
import { useParams, useHistory } from "react-router-dom"
import { useSaveQuestionMutation } from "../generated/graphql"
import FormikInput from "../components/FormikInput"
import MSGS from "../locale/es"

const Question = () => {
  const [error, setError] = React.useState(false)
  const history = useHistory()
  const toast = useToast()
  const [, saveQuestion] = useSaveQuestionMutation()
  let { userId }: any = useParams()
  if (!userId) history.push("/")

  const validateValues = (values: any) => {
    const regex = /^[0-9,]*$/
    const valideQuestions = regex.test(Object.keys(values).toString())
    console.log(valideQuestions)

    if (valideQuestions) {
      const arrValue = Object.values(values)
      const q = arrValue.find((value) => value === "1")
      if (QUESTIONS.length !== arrValue.length || q) {
        setError(true)
        return false
      }
      setError(false)
      return true
    } else {
    }
  }

  const validatePhone = (phone: any) => {
    const errors: any = {}
    if (!phone) {
      errors.phone = MSGS.REQUIRED
    }
    if (String(phone).length !== 7 && String(phone).length !== 10) {
      errors.phone = MSGS.INCORRECT_VALUE
    }

    return errors
  }

  return (
    <Wrapper variant="small">
      <Flex w="120%" alignItems="center" flex={1} p={5} flexDir="column">
        <Heading>Formulario salud</Heading>

        <Heading
          as="h5"
          size="sm"
          mb={6}
          mt={6}
          style={{ textAlign: "center" }}
        >
          {AVISO_PROTECCION_DATOS}
        </Heading>
        <Formik
          initialValues={{
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            emergencyContact: "",
            emergencyPhone: 0,
          }}
          validate={(values) => {
            validateValues(values)
            const errors = validatePhone(values.emergencyPhone)
            console.log(errors)
            return errors
          }}
          onSubmit={async (values: any) => {
            const params = Object.keys(values).map((key) => ({
              userId: userId || "",
              questionId: key,
              answer: values[key],
            }))
            console.log(params)
            // const res = await saveQuestion({ questions: params })
            // if (res.error) {
            //   return toast({
            //     description: res.error.message,
            //     title: "ocurrio un error",
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            //   })
            // }
            // history.push("/contactDetalis")
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Flex mb={5} justifyContent="space-around">
                <FormikInput
                  label="Contacto de emergencia"
                  name="emergencyContact"
                  w="90%"
                  required
                />
                <FormikInput
                  label="Numero de contacto"
                  name="emergencyPhone"
                  type="number"
                  required
                />
              </Flex>
              <Box>
                <Text mt={5} mb={3}>
                  Responde cuidadosamente las siguientes preguntas:
                </Text>
                <Flex flexDir="column" w="100%">
                  {QUESTIONS &&
                    QUESTIONS.map((prg) => (
                      <YesNoRadioGroup
                        key={prg.id}
                        name={prg.id}
                        text={prg.question}
                      />
                    ))}
                  <Box mt={3}>
                    {error ? (
                      <PrimaryButton disabled type="submit">
                        Continuar
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton type="submit">
                        Confirmar reserva
                      </PrimaryButton>
                    )}
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
