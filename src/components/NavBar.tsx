import React from "react"
import { Link } from "react-router-dom"
import LangDropDown from "./LangDropDown"
import ShouldRender from "./ShouldRender"
import { useHeartbeatQuery, useLogoutMutation } from "../generated/graphql"
import { NAVABAR_LIST } from "../ui/formIds"
import ToggleDarkMode from "./ToggleDarkMode"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import NeutralButton from "./formElements/NeutralButton"
import DisplayText from "./formElements/DisplayMessage"

const NavBar = () => {
  const [{ data }] = useHeartbeatQuery()
  const [{ fetching }, logout] = useLogoutMutation()

  return (
    <Box style={{ position: "sticky" }}>
      <Flex alignItems="center" p={2} flexWrap="wrap">
        <Box flexGrow={0}>
          <ToggleDarkMode />
        </Box>
        <Box flexGrow={0} ml={3} w="100px">
          <Link to="/" id={NAVABAR_LIST.logo}>
            <Flex align="center">
              <img style={{ width: "40px" }} src="/logo192.png" alt="logo" />
              <Text ml={2}>
                <DisplayText id="app.navBar.home" defaultMessage="home" />
              </Text>
            </Flex>
          </Link>
        </Box>
        <Flex flexDir="column" align="initial" flexGrow={1} ml={3}>
          <Heading
            as="h2"
            size="md"
            style={{ color: "#dc6d6d" }}
            id={NAVABAR_LIST.headerTitle}
          >
            CENTRO DE FE Y ESPERANZA DE BELLO
          </Heading>
          <Heading as="h6" size="sm" id={NAVABAR_LIST.subTitle}>
            REGISTRO DE ASISTENCIA A LAS REUNIONES
          </Heading>
        </Flex>

        <ShouldRender if={data && data.heartBeat}>
          <Flex
            flexDir="row"
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={3}
            ml={3}
          >
            <Box left={0}>{data?.heartBeat?.firstName}</Box>
            <NeutralButton
              onClick={async () => {
                await logout()
              }}
              variant="link"
              isLoading={fetching}
            >
              <DisplayText id="app.buttons.logout" defaultMessage="logout" />
            </NeutralButton>
          </Flex>
        </ShouldRender>
        <LangDropDown />
      </Flex>
    </Box>
  )
}

export default NavBar
