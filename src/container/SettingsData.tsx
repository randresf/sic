import { Flex, Spinner } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import ChangePwd from "../components/ChangesPwd"
import DisplayText from "../components/formElements/DisplayMessage"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import ShouldRender from "../components/ShouldRender"
import { useAdminQuery, useUpdateAdminMutation } from "../generated/graphql"
import isEmpty from "../utils/isEmpty"
import isSettingsAdminDataValid from "../utils/isSettingsAdminDataValid"
import Notify from "../utils/notify"

const SettingsData = ({ children }: any) => {
  const { formatMessage } = useIntl()
  const [, updateUser] = useUpdateAdminMutation()
  const [newPwd, onChangenewPwd] = useState(false)

  const [{ data, fetching }] = useAdminQuery()

  const initialValues = isEmpty(data?.getAdminData)
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
        ...data?.getAdminData,
        password: "",
        newPassword: "",
        repeatPassword: "",
      }

  const validateInputs = (values: any) => {
    const errors = isSettingsAdminDataValid({ ...values, formatMessage })
    return errors
  }

  const onSubmit = async ({ __typename, repeatPassword, ...values }: any) => {
    const update = await updateUser({ userData: values })
    if (update.error) {
      return Notify({
        title: formatMessage({ id: "app.notification.userDontUpdate" }),
        type: "error",
      })
    }
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
            <ShouldRender if={data?.getAdminData}>
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
