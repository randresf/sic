import { Heading } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import DisplayText from "../components/formElements/DisplayMessage"
import { Title } from "../components/Title"
import Meetings from "../container/Meetings"
import { useHeartbeatQuery } from "../generated/graphql"
import Layout from "../layouts"
import { MEETINGS_LIST } from "../ui/formIds"
import BtnSearchReservation from "../components/BtnSearchReservation"
import Slider from "../components/Slide"

const MeetingPage = () => {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  if (data && data.heartBeat) {
    history.replace("/dashboard")
  }
  return (
    <Slider direction="top">
      <Layout>
        <Title />
        <Heading mt={10} as="h2" size="md" id={MEETINGS_LIST.title}>
          <DisplayText id="app.title" defaultMessage="Próximos eventos:" />
        </Heading>
        <Meetings />
        <BtnSearchReservation />
      </Layout>
    </Slider>
  )
}

export default MeetingPage
