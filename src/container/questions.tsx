import React from "react"
import Wrapper from "../components/Wrapper"
import {
  Box,
  Flex,
  Heading,
  useToast,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import YesNoRadioGroup from "../components/YesNoRadioGroup"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"
import { TITULO_AVISO_MODAL } from "../constants/index"
import { MENSAJE_NO_INGRESO } from "../constants/index"
import { useParams, useHistory } from "react-router-dom"
import { useSaveQuestionMutation } from "../generated/graphql"
import { useUpdateContactUserMutation } from "../generated/graphql"
import FormikInput from "../components/FormikInput"
import MSGS from "../locale/es"
import ModalWrapper from "../components/ModalError"

const Question = () => {
  const { onClose } = useDisclosure()
  const [error, setError] = React.useState(false)
  const [errorIncomplete, setErrorIncomplete] = React.useState(true)
  const history = useHistory()
  const toast = useToast()
  const [, saveQuestion] = useSaveQuestionMutation()
  const [, updateContactUser] = useUpdateContactUserMutation()
  let { userId }: any = useParams()
  if (!userId) history.push("/")

  const validateQuestions = async (values: any) => {
    const { emergencyPhone, emergencyContact, ...questions } = values

    const arrValue = Object.values(questions)
    const q = arrValue.find((value) => value === "1")
    if (QUESTIONS.length !== arrValue.length - 2) {
      setErrorIncomplete(true)
    } else {
      setErrorIncomplete(false)
      if (q) {
        setError(true)
      }
    }
  }

  const validateInputs = (values: any) => {
    const { contactNumber, emergenceContact } = values
    const errors: any = {}

    if (!contactNumber) {
      errors.emergencyPhone = MSGS.REQUIRED
    }
    if (
      String(contactNumber).length !== 7 &&
      String(contactNumber).length !== 10
    ) {
      errors.contactNumber = MSGS.INCORRECT_VALUE
    }

    if (!emergenceContact) {
      errors.emergenceContact = MSGS.REQUIRED
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
            emergenceContact: "",
            contactNumber: "",
          }}
          validate={(values) => {
            const errors = validateInputs(values)
            return errors
          }}
          onSubmit={async (values: any) => {
            validateQuestions(values)
            if (errorIncomplete) {
              return toast({
                description: "responda todas las preguntas por favor",
                title: "ocurrio un error",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }

            const { emergenceContact, contactNumber, ...questions } = values

            const contactData = { emergenceContact, contactNumber }
            const resEmergencyContact = await updateContactUser({
              userId,
              contactData,
            })

            if (resEmergencyContact.error) {
              return toast({
                description: resEmergencyContact.error.message,
                title: "ocurrio un error",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }

            const params = Object.keys(questions).map((key) => ({
              questionId: key,
              answer: values[key],
            }))
            const res = await saveQuestion({
              questions: params,
              userId: userId || String,
            })
            if (res.error) {
              return toast({
                description: res.error.message,
                title: "ocurrio un error",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }
            toast({
              description: "",
              title: "guardado correctamente",
              status: "success",
              duration: 3000,
              isClosable: true,
            })
            history.push(`/contactDetalis/${userId}`)
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Flex mb={5} justifyContent="space-around">
                <FormikInput
                  label="Contacto de emergencia"
                  name="emergenceContact"
                  w="90%"
                  required
                />
                <FormikInput
                  label="Numero de contacto"
                  name="contactNumber"
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
                      <PrimaryButton isdisabled type="submit">
                        Confirmar reserva
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
        <ModalWrapper
          titulo={TITULO_AVISO_MODAL}
          contenido={MENSAJE_NO_INGRESO}
          isOpen={error}
          onClose={onClose}
        ></ModalWrapper>
      </Flex>
    </Wrapper>
  )
}

export default Question
