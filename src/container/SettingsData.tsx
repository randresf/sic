import React, { useState } from "react"
import { useIntl } from "react-intl"
import { useHistory } from "react-router-dom"

import { Box, Flex, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import DisplayText from "../components/formElements/DisplayMessage"
import { useUserQuery, useUpdateUserMutation } from "../generated/graphql"
import Loading from "../components/formElements/Loading"
import isEmpty from "../utils/isEmpty"

const SettingsData = ({ children }: any) => {
  const toast = useToast()
  const { formatMessage } = useIntl()
  const [, updateUser] = useUpdateUserMutation()
  const [newPwd, onChangenewPwd] = useState(false)
  const history = useHistory()

  const [{ data, fetching }] = useUserQuery()

  const initialValues = isEmpty(data?.getUserData)
    ? {
        firstName: "",
        lastname: "",
        phone: 0,
        email: "",
        password: "",
        newPassword: "",
        repeatPassword: "",
      }
    : {
        ...data?.getUserData,
        password: "",
        newPassword: "",
        repeatPassword: "",
      }

  console.log(data)

  const onSubmit = async ({ __typename, repeatPassword, ...values }: any) => {
    if (repeatPassword !== values.newPassword) {
      return toast({
        title: formatMessage({ id: "app.login.pwdIncorret" }),
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    const update = await updateUser({ userData: values })
    if (update.error) {
      return toast({
        title: formatMessage({ id: "app.notification.userDontUpdate" }),
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    history.push("/dashboard")
    return toast({
      title: formatMessage({ id: "app.notification.userUpdate" }),
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  if (fetching) return <Loading loading />
  return (
    <Box minW="300px">
      <Formik
        enableReinitialize
        initialValues={initialValues}
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
                <PrimaryButton
                  w="60%"
                  mt={3}
                  onClick={() => {
                    onChangenewPwd(!newPwd)
                  }}
                >
                  {newPwd ? (
                    <DisplayText id="app.label.hide" defaultMessage="hide" />
                  ) : (
                    <DisplayText
                      id="app.buttons.changePwd"
                      defaultMessage="change password"
                    />
                  )}
                </PrimaryButton>
                <FormikInput
                  id="5"
                  type="password"
                  label={formatMessage({ id: "form.pwd" })}
                  name="password"
                  display={newPwd ? "" : "none"}
                  disabled={false}
                  required={newPwd}
                />
                <FormikInput
                  id="6"
                  type="password"
                  display={newPwd ? "" : "none"}
                  label={formatMessage({ id: "form.Newpwd" })}
                  name="newPassword"
                  disabled={false}
                  required={newPwd}
                />
                <FormikInput
                  id="7"
                  type="password"
                  display={newPwd ? "" : "none"}
                  label={formatMessage({ id: "form.Repeatpwd" })}
                  name="repeatPassword"
                  disabled={false}
                  required={newPwd}
                />
                <Box mt={3}>
                  {children}
                  <PrimaryButton ml={3} type="submit" isLoading={isSubmitting}>
                    <DisplayText id="app.buttons.save" defaultMessage="save" />
                  </PrimaryButton>
                </Box>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default SettingsData
