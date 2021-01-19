import React from "react"
import { Link } from "react-router-dom"
import LangDropDown from "./LangDropDown"
import { NAVABAR_LIST } from "../ui/formIds"
import ToggleDarkMode from "./ToggleDarkMode"
import { Box, Flex, Text } from "@chakra-ui/react"
import DisplayText from "./formElements/DisplayMessage"
import DividerWrapper from "./formElements/Divider"
import Account from "./Account"
import OrganizationTitle from "./OrganizationTitle"
import Logo from "./Logo"

const NavBar = () => {
  return (
    <Box style={{ position: "sticky" }} pl={5} pr={5} pt={2}>
      <Flex alignItems="center" flexWrap="wrap" height="60px">
        <ToggleDarkMode />
        <Box ml={3} w="100px">
          <Link to="/" id={NAVABAR_LIST.logo}>
            <Flex align="center">
              <Logo />
              <Text ml={2}>
                <DisplayText id="app.navBar.home" defaultMessage="home" />
              </Text>
            </Flex>
          </Link>
        </Box>
        <DividerWrapper mr={5} ml={5} orientation="vertical" />
        <OrganizationTitle />
        <Flex
          flexDir="row"
          justifyContent="flex-end"
          alignItems="center"
          flexGrow={1}
          height="100%"
        >
          <DividerWrapper mr={5} ml={5} orientation="vertical" />
          <LangDropDown />
          <DividerWrapper mr={5} ml={5} orientation="vertical" />
          <Account />
        </Flex>
      </Flex>
    </Box>
  )
}

export default NavBar
