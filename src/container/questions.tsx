import React from "react"
import Wrapper from "../components/Wrapper"
import { Box, Flex, Heading, useToast, Text } from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import YesNoRadioGroup from "../components/YesNoRadioGroup"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"
import { TITULO_AVISO_MODAL } from "../constants/index"
import { MENSAJE_NO_INGRESO } from "../constants/index"
import { useParams, useHistory, Link } from "react-router-dom"
import { useSaveQuestionMutation } from "../generated/graphql"
import { useUpdateContactUserMutation } from "../generated/graphql"
import FormikInput from "../components/FormikInput"
import MSGS from "../locale/es"
import ModalWrapper from "../components/ModalWrapper"
import { QUESTION_VIEW } from "../ui/formIds"

const Question = () => {
  const [error, setError] = React.useState(false)
  const [errorInco, setErrorInco] = React.useState(true)
  const history = useHistory()
  const toast = useToast()
  const [, saveQuestion] = useSaveQuestionMutation()
  const [, updateContactUser] = useUpdateContactUserMutation()
  let { userId }: any = useParams()
  if (!userId) history.push("/")

  const onClose = () => {
    setError(false)
    history.push("/")
  }

  const validateQuestions = async (values: any) => {
    const { emergencyPhone, emergencyContact, ...questions } = values

    const arrValue = Object.values(questions)
    const q = arrValue.find((value) => value === "1")
    if (QUESTIONS.length !== arrValue.length - 2) {
      return setErrorInco(true)
    } else {
      setErrorInco(false)
    }
    if (q) {
      setError(true)
    }
    return setErrorInco(false)
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
      <Flex w="100%" alignItems="center" flex={1} p={5} flexDir="column">
        <Heading id={QUESTION_VIEW.formTitle}>Formulario salud</Heading>

        <Heading
          id={QUESTION_VIEW.formparagraph}
          as="h5"
          size="sm"
          mb={6}
          mt={6}
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
            validateQuestions(values)
            //
            //

            return errors
          }}
          onSubmit={async (values: any) => {
            const { emergenceContact, contactNumber, ...questions } = values
            const contactData = { emergenceContact, contactNumber }
            const resEmergencyContact = await updateContactUser({
              userId,
              contactData,
            })

            if (resEmergencyContact.error) {
              return toast({
                description: resEmergencyContact.error.message,
                title: "no se pudo guardar el contactio de emergencia",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }

            if (errorInco) {
              return toast({
                description: "",
                title: "Por favor complete todas las preguntas",
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
              userId: userId,
            })
            if (res.error) {
              return toast({
                description: res.error.message,
                title: "",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }
            history.push(`/confirm/${userId}`)
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Flex mb={5} justifyContent="space-around">
                <FormikInput
                  id={QUESTION_VIEW.emergenceContact}
                  label="Contacto de emergencia"
                  name="emergenceContact"
                  w="90%"
                  required
                />
                <FormikInput
                  id={QUESTION_VIEW.contactNumber}
                  label="Número de contacto"
                  name="contactNumber"
                  type="number"
                  required
                />
              </Flex>
              <Box>
                <Text id={QUESTION_VIEW.notice} mt={5} mb={3}>
                  Responde cuidadosamente las siguientes preguntas:
                </Text>
                <Flex flexDir="column" w="100%">
                  {QUESTIONS && <YesNoRadioGroup questions={QUESTIONS} />}
                  <Box mt={3}>
                    <PrimaryButton
                      id={QUESTION_VIEW.btnGoBack}
                      mr={3}
                      onClick={() => {
                        history.goBack()
                      }}
                    >
                      volver
                    </PrimaryButton>
                    <PrimaryButton
                      id={QUESTION_VIEW.btnSubmit}
                      type="submit"
                      disabled={error}
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
        <ModalWrapper
          titulo={TITULO_AVISO_MODAL}
          contenido={
            <>
              {MENSAJE_NO_INGRESO}
              <Link
                id={QUESTION_VIEW.linkNoEntry}
                to="https://www.youtube.com/c/cfebello"
                target="_blank"
                style={{ color: "#62ade2" }}
              >
                cfebello
              </Link>
            </>
          }
          isOpen={error}
          onClose={onClose}
        ></ModalWrapper>
      </Flex>
    </Wrapper>
  )
}

export default Question
