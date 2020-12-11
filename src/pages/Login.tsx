import { Box, Flex, Heading } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import Wrapper from "../components/Wrapper"
import FormikInput from "../components/FormikInput"
import MSGS from "../locale/es"
import PrimaryButton from "../components/PrimaryButton"

const Login = () => {
  const validateInputs = (values: any) => {
    const { user, pwd } = values
    const errors: any = {}

    if (!user) {
      errors.user = MSGS.REQUIRED
    }
    if (!pwd) {
      errors.pwd = MSGS.REQUIRED
    }

    return errors
  }

  return (
    <Wrapper variant="small">
      <Flex w="100%" alignItems="center" flex={1} p={5} flexDir="column">
        <Heading mb={5}>Aforo</Heading>
        <Box mb={5}>
          <img src="/logo192.png" alt="logo" width={90} />
        </Box>
        <Formik
          initialValues={{
            user: "",
            pwd: "",
          }}
          validate={(values) => {
            const errors = validateInputs(values)
            return errors
          }}
          onSubmit={async (values: any) => {}}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "90%" }}>
              <Flex mb={5} justifyContent="space-around" flexDir="column">
                <FormikInput label="Usuario" name="user" required />
                <FormikInput label="Password" name="pwd" required />
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
