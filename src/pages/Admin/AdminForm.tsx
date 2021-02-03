import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import DisplayText from "../../components/formElements/DisplayMessage"
import FormikInput from "../../components/formElements/FormikInput"
import PrimaryButton from "../../components/formElements/PrimaryButton"
import { useAddOrganizationMutation } from "../../generated/graphql"
import { CITIZEN_FORM } from "../../ui/formIds"
import { OrgAdminSchema } from "../../ui/formSchemas"
import Notify from "../../utils/notify"
import { AccountCreated } from "./AccountCreated"

export const AdminForm = () => {
  const { formatMessage } = useIntl()
  const [created, setCreated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [{ data }, addOrg] = useAddOrganizationMutation()
  if (created) return <AccountCreated data={data?.addOrganization.org} />
  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        key: "",
      }}
      validationSchema={OrgAdminSchema}
      onSubmit={async ({ name, username, key, email }) => {
        setLoading(true)
        const { data, error } = await addOrg({
          data: { name, username, email },
          key,
        })
        setLoading(false)
        if (data?.addOrganization.errors) {
          return Notify({
            title: "Error",
            description: data?.addOrganization.errors[0].message,
            type: "error",
          })
        }
        if (data?.addOrganization.org) setCreated(true)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormikInput
            label="organization name"
            name="name"
            disabled={loading}
            id="orgName"
            required
          />
          <FormikInput
            label="default admin username"
            name="username"
            disabled={loading}
            id="defaultUsername"
            required
          />
          <FormikInput
            label="admin email"
            name="email"
            disabled={loading}
            id="defaultUsernameEmail"
            required
          />
          <FormikInput
            label="api key"
            name="key"
            disabled={loading}
            id="apiKeyField"
            required
          />

          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            id={CITIZEN_FORM.submit}
          >
            <DisplayText id="app.buttons.continue" defaultMessage="continue" />
          </PrimaryButton>
        </Form>
      )}
    </Formik>
  )
}
