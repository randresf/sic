import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import Wrapper from "../components/Wrapper"
import PersonalDataForm from "../container/PersonalDataForm"
import { CITIZEN_FORM } from "../ui/formIds"
import DisplayText from "../components/formElements/DisplayMessage"

const UserData = () => {
  return (
    <Wrapper>
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading id={CITIZEN_FORM.headingTitle}>
          <DisplayText
            id="app.personalInformation.title"
            defaultMessage="Personal information"
          />
        </Heading>
        <PersonalDataForm />
      </Flex>
    </Wrapper>
  )
}

export default UserData
