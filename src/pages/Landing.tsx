import React from "react"
import { Flex, Heading } from "@chakra-ui/react"
import Meetings from "../container/Meetings"
import { Title } from "../components/Title"
import { useHeartbeatQuery } from "../generated/graphql"
import { useHistory } from "react-router-dom"
import DisplayText from "../components/formElements/DisplayMessage"
import { MEETINGS_LIST } from "../ui/formIds"
import SearchReservation from "../container/SearchReservation"

const Landing = () => {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  if (data && data.heartBeat) {
    history.replace("/dashboard")
  }
  return (
    <Flex flexDir="column">
      <Title />
      <Heading as="h2" size="md" id={MEETINGS_LIST.title}>
        <DisplayText
          id="app.meetings.title"
          defaultMessage="Próximos eventos:"
        />
      </Heading>
      <Meetings />
      <SearchReservation />
    </Flex>
  )
}

export default Landing
