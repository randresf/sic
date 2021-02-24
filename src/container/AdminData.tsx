import { Box, Flex } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import { useIntl } from "react-intl"
import DisplayText from "../components/formElements/DisplayMessage"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import Notify from "../utils/notify"
import { useAddAdminMutation } from "../generated/graphql"
import ModalActions from "../components/ModalActions"
import isAdminDataValid from "../utils/isAdminDataValid"

const AdminData = ({ children }: any) => {
  const { formatMessage } = useIntl()
  const [, saveAdmin] = useAddAdminMutation()
  const initialValues = {
    firstName: "",
    lastName: "",
    phone: 0,
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  }

  const validateInputs = (values: any) => {
    const errors = isAdminDataValid({ ...values, formatMessage })
    return errors
  }

  const onSubmit = async ({ ...values }: any) => {
    const { repeatPassword, ...data } = values
    const res = await saveAdmin({ data: data })
    if (res.data?.register.errors) {
      return Notify({
        title: formatMessage({ id: "app.modalAdmin.dontSaveAdmin" }),
        type: "error",
      })
    }
    return Notify({
      title: formatMessage({ id: "app.modalAdmin.saveAdmin" }),
      type: "success",
    })
  }

  return (
    <Box minW="300px">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={validateInputs}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setValues, values }) => (
          <Form style={{ width: "100%" }}>
            <Box>
              <Flex flexDir="column" w="100%">
                <FormikInput
                  id="1"
                  label={formatMessage({ id: "form.names" })}
                  name="firstName"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="2"
                  label={formatMessage({ id: "form.lastNames" })}
                  name="lastName"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="3"
                  label={formatMessage({ id: "form.phone" })}
                  type="number"
                  name="phone"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="4"
                  label={formatMessage({ id: "form.email" })}
                  name="email"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="5"
                  label={formatMessage({ id: "form.user" })}
                  name="username"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="6"
                  type="password"
                  label={formatMessage({ id: "form.pwd" })}
                  name="password"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="7"
                  type="password"
                  label={formatMessage({ id: "form.Repeatpwd" })}
                  name="repeatPassword"
                  disabled={false}
                  required
                />
                <ModalActions>
                  {children}
                  <PrimaryButton type="submit" isLoading={isSubmitting}>
                    <DisplayText id="app.buttons.save" defaultMessage="save" />
                  </PrimaryButton>
                </ModalActions>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AdminData
