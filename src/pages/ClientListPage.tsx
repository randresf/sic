import { Select } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import { useHeartbeatQuery } from "../generated/graphql"

export const ClientListPage = () => {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  if (data && data.heartBeat) {
    history.replace("/dashboard")
  }
  return (
    <Select onChange={() => {}}>
      <option>client 1</option>
    </Select>
  )
}
