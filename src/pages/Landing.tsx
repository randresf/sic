import { Heading } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import DisplayText from "../components/formElements/DisplayMessage"
import { Title } from "../components/Title"
import Meetings from "../container/Meetings"
import SearchReservation from "../container/SearchReservation"
import { useHeartbeatQuery } from "../generated/graphql"
import Layout from "../layouts"
import { MEETINGS_LIST } from "../ui/formIds"

const Landing = () => {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  if (data && data.heartBeat) {
    history.replace("/dashboard")
  }
  return (
    <Layout>
      <Title />
      <Heading as="h2" size="md" id={MEETINGS_LIST.title}>
        <DisplayText
          id="app.meetings.title"
          defaultMessage="Próximos eventos:"
        />
      </Heading>
      <Meetings />
      <SearchReservation />
    </Layout>
  )
}

export default Landing
