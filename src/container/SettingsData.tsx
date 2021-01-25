import React, { useState } from "react"
import { useIntl } from "react-intl"
import { useHistory } from "react-router-dom"

import { Flex, Spinner } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import DisplayText from "../components/formElements/DisplayMessage"
import { useUserQuery, useUpdateUserMutation } from "../generated/graphql"
import isEmpty from "../utils/isEmpty"
import ShouldRender from "../components/ShouldRender"
import Notify from "../utils/notify"
import ChangePwd from "../components/ChangesPwd"
import isSettingsAdminDataValid from "../utils/isSettingsAdminDataValid"

const SettingsData = ({ children }: any) => {
  const { formatMessage } = useIntl()
  const [, updateUser] = useUpdateUserMutation()
  const [newPwd, onChangenewPwd] = useState(false)
  const history = useHistory()

  const [{ data, fetching }] = useUserQuery()

  const initialValues = isEmpty(data?.getUserData)
    ? {
        firstName: "",
        lastName: "",
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

  const validateInputs = (values: any) => {
    const errors = isSettingsAdminDataValid({ ...values, formatMessage })
    return errors
  }

  const onSubmit = async ({ __typename, repeatPassword, ...values }: any) => {
    console.log(values)
    const update = await updateUser({ userData: values })
    if (update.error) {
      return Notify({
        title: formatMessage({ id: "app.notification.userDontUpdate" }),
        type: "error",
      })
    }
    history.push("/dashboard?tab=2")
    return Notify({
      title: formatMessage({ id: "app.notification.userUpdate" }),
      type: "success",
    })
  }

  if (fetching) return <Spinner />
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateInputs}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDir="column">
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
            <ShouldRender if={data?.getUserData}>
              <ChangePwd onChangenewPwd={onChangenewPwd} newPwd={newPwd} />
            </ShouldRender>
            <Flex mt={2} justifyContent="flex-end">
              {children}
              <PrimaryButton ml={3} type="submit" isLoading={isSubmitting}>
                <DisplayText id="app.buttons.save" defaultMessage="save" />
              </PrimaryButton>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}

export default SettingsData
