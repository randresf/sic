import { Flex } from "@chakra-ui/react"
import React from "react"
import { ClientListPage } from "./ClientListPage"
import FooterLanding from "./FooterLanding"
import Home from "./Home"
import NavBarLanding from "./NavBarLanding"

const Landing = () => {
  return (
    <Flex flexDir="column">
      <NavBarLanding />
      <Home />
      <ClientListPage />
      <FooterLanding />
    </Flex>
  )
}

export default Landing
