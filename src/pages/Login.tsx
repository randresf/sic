import { Flex, Heading, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import Wrapper from "../components/Wrapper"
import FormikInput from "../components/FormikInput"
import PrimaryButton from "../components/PrimaryButton"
import { useLoginMutation } from "../generated/graphql"
import { useHistory } from "react-router-dom"
import { GetDisplayText } from "../utils/displayText"

const Login = () => {
  const [, login] = useLoginMutation()
  const history = useHistory()
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const validateInputs = (values: any) => {
    const { user, pwd } = values
    const errors: any = {}

    if (!user) {
      errors.user = GetDisplayText("form.required", "requerido")
    }
    if (!pwd) {
      errors.pwd = GetDisplayText("form.required", "requerido")
    }

    return errors
  }

  return (
    <Wrapper variant="small">
      <Flex w="100%" alignItems="center" flex={1} p={5} flexDir="column">
        <Heading mb={5}>Aforo Admin</Heading>
        <Formik
          initialValues={{
            user: "",
            pwd: "",
          }}
          validate={(values) => {
            const errors = validateInputs(values)
            return errors
          }}
          onSubmit={async ({ pwd, user }: any) => {
            const { data, error } = await login({ pwd, usr: user })
            if (data?.login.errors) {
              return toast({
                description: data?.login.errors[0].message,
                status: "error",
              })
            }
            toast({
              description: `bienvenido ${data?.login.admin?.firstName}`,
              status: "success",
            })
            history.push("/")
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "90%" }}>
              <Flex mb={5} justifyContent="space-around" flexDir="column">
                <FormikInput label="Usuario" name="user" required />
                <FormikInput
                  label="Password"
                  type="password"
                  name="pwd"
                  required
                />
              </Flex>

              <PrimaryButton
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                continuar
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Flex>
    </Wrapper>
  )
}

export default Login
