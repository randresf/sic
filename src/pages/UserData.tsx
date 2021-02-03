import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import DisplayText from "../components/formElements/DisplayMessage"
import PersonalDataForm from "../container/PersonalDataForm"
import Layout from "../layouts"
import { CITIZEN_FORM } from "../ui/formIds"

const UserData = () => {
  return (
    <Layout>
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading id={CITIZEN_FORM.headingTitle}>
          <DisplayText
            id="app.personalInformation.title"
            defaultMessage="Personal information"
          />
        </Heading>
        <PersonalDataForm />
      </Flex>
    </Layout>
  )
}

export default UserData
