import { Flex, Heading, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import Wrapper from "../components/Wrapper"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import { useHeartbeatQuery, useLoginMutation } from "../generated/graphql"
import { useHistory, useLocation } from "react-router-dom"
import { useIntl } from "react-intl"
import Loading from "../components/formElements/Loading"
import queryString from "query-string"

const Login = () => {
  const [, login] = useLoginMutation()
  const [{ data, fetching }] = useHeartbeatQuery()
  const { formatMessage } = useIntl()
  const IS_REQUIRED = formatMessage({ id: "form.required" })
  const history = useHistory()
  const location = useLocation()
  const { next = "/settings" } = queryString.parse(location.search)
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const validateInputs = (values: any) => {
    const { user, pwd } = values
    const errors: any = {}

    if (!user) {
      errors.user = IS_REQUIRED
    }
    if (!pwd) {
      errors.pwd = IS_REQUIRED
    }

    return errors
  }

  if (data && data.heartBeat) history.push("/settings")
  return (
    <Wrapper variant="small">
      <Loading loading={fetching} />
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
            const { data } = await login({ pwd, usr: user })
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
            history.push(String(next))
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
              <PrimaryButton type="submit" isLoading={isSubmitting}>
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
