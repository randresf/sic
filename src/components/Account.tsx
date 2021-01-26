import React from "react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  Spinner,
} from "@chakra-ui/react"
import { useHeartbeatQuery, useLogoutMutation } from "../generated/graphql"
import DisplayText from "./formElements/DisplayMessage"
import ShouldRender from "./ShouldRender"
import { SettingsIcon } from "@chakra-ui/icons"
import { useHistory } from "react-router-dom"
import { app_brand } from "../theme/components/general"

export default function Account() {
  const { colorMode } = useColorMode()
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  const [{ fetching }, logout] = useLogoutMutation()
  if (fetching) return <Spinner />

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
        <MenuList
          background={colorMode === "dark" ? app_brand.darkBg : app_brand.bg}
        >
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
