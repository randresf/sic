import React from "react"
import Wrapper from "../components/Wrapper"
import { Box, Flex, Heading, useToast } from "@chakra-ui/react"
import PrimaryButton from "../components/PrimaryButton"
import YesNoRadioGroup from "../components/YesNoRadioGroup"
import { Formik, Form } from "formik"
import { QUESTIONS } from "../constants/index"
import { AVISO_PROTECCION_DATOS } from "../constants/index"
import { useParams, useHistory } from "react-router-dom"
import { useSaveQuestionMutation } from "../generated/graphql"

const Question = () => {
  const [error, setError] = React.useState(true)
  const history = useHistory()
  const toast = useToast()
  const [, saveQuestion] = useSaveQuestionMutation()
  let { userId }: any = useParams()
  if (!userId) history.push("/")

  const validate = (values: any) => {
    const arrValue = Object.values(values)
    const q = arrValue.find((value) => value === "1")
    if (QUESTIONS.length !== arrValue.length || q) {
      setError(true)
      return false
    }
    setError(false)
    return true
  }

  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
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
          initialValues={{}}
          validate={(values) => {
            validate(values)
          }}
          onSubmit={async (values: any) => {
            const params = Object.keys(values).map((key) => ({
              questionId: key,
              answer: values[key],
            }))
            const res = await saveQuestion({ questions: params, userId })
            if (res.error) {
              return toast({
                description: res.error.message,
                title: "ocurrio un error",
                status: "error",
                duration: 3000,
                isClosable: true,
              })
            }
            history.push("/contactDetalis")
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <Box>
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
                    <PrimaryButton
                      type="submit"
                      disabled={error}
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
