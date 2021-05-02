import { Flex } from "@chakra-ui/react"
import React from "react"
import AboutProduct from "./AboutProduc"
import { ClientListPage } from "./ClientListPage"
import FooterLanding from "./FooterLanding"
import Home from "./Home"
import NavBarLanding from "./NavBarLanding"
import PQR from "./PQR"

const Landing = () => {
  return (
    <Flex flexDir="column">
      <NavBarLanding />
      <Home />
      <AboutProduct />
      <ClientListPage />
      <PQR />
      <FooterLanding />
    </Flex>
  )
}

export default Landing
