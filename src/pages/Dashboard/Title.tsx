import { Heading } from "@chakra-ui/react"
import React from "react"
import DisplayText from "../../components/formElements/DisplayMessage"
import Loading from "../../components/formElements/Loading"
import { useHeartbeatQuery } from "../../generated/graphql"
import { MEETINGS_LIST } from "../../ui/formIds"

export default function DashboardTitle() {
  const [{ data, fetching }] = useHeartbeatQuery()
  if (fetching) return <Loading loading />
  return (
    <Heading as="h2" size="xl" id={MEETINGS_LIST.title}>
      <DisplayText id="app.dashboard.title" defaultMessage="hello" />{" "}
      {data?.heartBeat?.firstName}!
    </Heading>
  )
}
