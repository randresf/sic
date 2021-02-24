import { Center, Stack } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import PrimaryButton from "../../components/formElements/PrimaryButton"
import Subtitle from "../../components/formElements/Subtitle"

export const AccountCreated = ({ data = {} }: any) => {
  const history = useHistory()
  const { name = "", defaultAdmin = {} } = data
  return (
    <Center>
      <Stack spacing="1rem" direction="column">
        <Subtitle
          id="orgCreatedMsg"
          value={`Account for client ${name} was created successfuly with admin user: ${defaultAdmin?.username} and temp password: ${defaultAdmin?.password} `}
        />
        <PrimaryButton
          onClick={() => {
            history.push("/login")
          }}
        >
          Login to continue
        </PrimaryButton>
      </Stack>
    </Center>
  )
}
