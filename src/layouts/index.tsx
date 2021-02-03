import { Flex } from "@chakra-ui/react"
import React from "react"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import Wrapper from "../components/Wrapper"
import { ChildrenType } from "../utils/types"

export default function Layout({ children }: ChildrenType) {
  return (
    <Wrapper>
      <NavBar />
      <Flex flexDir="column" minHeight="85vh" p={[2, 4, 6, 8]}>
        {children}
      </Flex>
      <Footer />
    </Wrapper>
  )
}
