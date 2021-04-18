import { Flex, Heading, Select, Text } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import { useHeartbeatQuery } from "../../generated/graphql"

export const ClientListPage = () => {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  console.log(data)
  if (data && data.heartBeat) {
    history.replace("/dashboard")
  }
  return (
    <Flex alignItems="center" flexDir="column" h="100vh" mt="50px">
      <Flex mt={10} alignItems="center" flexDir="column">
        <Heading>Varios de nuestros clientes</Heading>
        <Text>varios de nuestros clientes</Text>
      </Flex>
      <Select onChange={() => {}}>
        <option>client 1</option>
      </Select>
    </Flex>
  )
}
