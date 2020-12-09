import { Flex, Heading } from "@chakra-ui/react"
import React from "react"
import Wrapper from "../components/Wrapper"
import PersonalDataForm from "../container/formUserData"
import { CITIZEN_FORM } from "../ui/formIds"

const UserData = () => {
  return (
    <Wrapper variant="small">
      <Flex alignItems="center" flex={1} p={5} flexDir="column">
        <Heading id={CITIZEN_FORM.headingTitle}>Datos Personales</Heading>
        <PersonalDataForm />
      </Flex>
    </Wrapper>
  )
}

export default UserData
