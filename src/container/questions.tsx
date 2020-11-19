import React from "react"
import Wrapper from "../components/Wrapper"
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import YesNoRadioGroup from "../components/YesNoRadioGroup"
import ModalError from "../components/ModalError"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"
import { TITULO_AVISO_MODAL } from "../constants/index"
import { MENSAJE_NO_INGRESO } from "../constants/index"

const QuestionsMutation = `
  mutation {
    registrerQuestion(
      data: 
    ){
      questionId
    }
  }
`

const Question = () => {
  const [value, setValue] = React.useState({})
  const [error, setError] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onRadioGroupChange = function (questionId: number) {
    return function updateQuestionValue(radioValue: string) {
      setValue({ ...value, [questionId]: radioValue })
    }
  }

  const validate = () => {
    console.log(value)
    const arrValue = Object.values(value)
    if (arrValue.length < 7) {
      setError(true)
    } else {
      setError(false)
    }
    const q = arrValue.find((value) => value === "1")
    console.log(q)
    if (q) {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading>Formulario salud</Heading>
        <Formik
          initialValues={{
            citizenId: "",
            questionId: "",
            questionText: "",
            answer: "",
          }}
          validate={(values) => {
            console.log(values)
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
                  {QUESTIONS &&
                    QUESTIONS.map((prg) => (
                      <YesNoRadioGroup
                        key={prg.id}
                        name="pregunta"
                        text={prg.question}
                        onChange={onRadioGroupChange(prg.id)}
                      />
                    ))}
                  <Box mt={3}>
                    {error ? (
                      <PrimaryButton type="submit" onClick={onOpen}>
                        modal
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton type="submit">Continuar</PrimaryButton>
                    )}
                  </Box>
                </Flex>
              </Box>
            </Form>
          )}
        </Formik>
      </Flex>
      <ModalError
        titulo={TITULO_AVISO_MODAL}
        contenido={MENSAJE_NO_INGRESO}
        isOpen={isOpen}
        onClose={onClose}
      ></ModalError>
    </Wrapper>
  )
}

export default Question
