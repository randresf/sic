import React from "react"
import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react"
import { useHeartbeatQuery, useLogoutMutation } from "../generated/graphql"
import Loading from "./formElements/Loading"
import DisplayText from "./formElements/DisplayMessage"
import ShouldRender from "./ShouldRender"
import { SettingsIcon } from "@chakra-ui/icons"
import { useHistory } from "react-router-dom"

export default function Account() {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  const [{ fetching }, logout] = useLogoutMutation()
  if (fetching) return <Loading loading />

  return (
    <ShouldRender if={data && data.heartBeat}>
      <Menu>
        <MenuButton as={Text}>
          <DisplayText
            id="app.navbar.greeting"
            defaultMessage="registrado como"
          />{" "}
          {data?.heartBeat?.firstName}
          <SettingsIcon ml={3} />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={async () => {
              history.push("/settings")
            }}
          >
            <DisplayText id="app.account.settings" defaultMessage="settings" />
          </MenuItem>
          <MenuItem
            onClick={async () => {
              await logout()
            }}
          >
            <DisplayText id="app.account.logOut" defaultMessage="logout" />
          </MenuItem>
        </MenuList>
      </Menu>
    </ShouldRender>
  )
}
