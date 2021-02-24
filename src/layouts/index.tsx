import { Flex } from "@chakra-ui/react"
import React from "react"
import Wrapper from "../components/Wrapper"
import { ChildrenType } from "../utils/types"
import Footer from "./Footer"
import "./index.css"
import NavBar from "./NavBar"

export default function Layout({ children }: ChildrenType) {
  return (
    <Wrapper>
      <NavBar />
      <main className="content">
        <Flex flexDir="column" minHeight="85vh" p={[2, 4, 6, 8]}>
          {children}
        </Flex>
      </main>
      <Footer />
    </Wrapper>
  )
}
