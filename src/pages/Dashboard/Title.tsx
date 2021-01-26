import { Spinner } from "@chakra-ui/react"
import React from "react"
import DisplayText from "../../components/formElements/DisplayMessage"
import Heading from "../../components/formElements/Heading"
import { useHeartbeatQuery } from "../../generated/graphql"
import { MEETINGS_LIST } from "../../ui/formIds"

export default function DashboardTitle() {
  const [{ data, fetching }] = useHeartbeatQuery()
  if (fetching) return <Spinner />
  return (
    <Heading id={MEETINGS_LIST.title} fontSize="3xl">
      <DisplayText id="app.dashboard.title" defaultMessage="hello" />{" "}
      {data?.heartBeat?.firstName}!
    </Heading>
  )
}
