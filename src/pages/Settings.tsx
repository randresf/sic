import { Heading } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import DisplayText from "../components/formElements/DisplayMessage"
import NeutralButton from "../components/formElements/NeutralButton"
import SettingsData from "../container/SettingsData"
import Layout from "../layouts"
import { CITIZEN_FORM } from "../ui/formIds"

const Settings = () => {
  const history = useHistory()
  return (
    <Layout>
      <Heading id={CITIZEN_FORM.headingTitle}>
        <DisplayText id="app.settings.title" defaultMessage="settings" />
      </Heading>
      <SettingsData>
        <NeutralButton
          onClick={() => {
            history.push("/dashboard")
          }}
        >
          <DisplayText id="app.buttons.back" defaultMessage="cancel" />
        </NeutralButton>
      </SettingsData>
    </Layout>
  )
}

export default Settings
