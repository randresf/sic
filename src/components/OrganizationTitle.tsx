import React from "react"
import { NAVABAR_LIST } from "../ui/formIds"
import { Flex } from "@chakra-ui/react"
import Subtitle from "./formElements/Subtitle"
import Heading from "./formElements/Heading"

export default function OrganizationTitle() {
  return (
    <Flex flexDir="column" align="initial" flexGrow={1} ml={3}>
      <Heading
        style={{ color: "#1A365D" }}
        id={NAVABAR_LIST.headerTitle}
      >
        CENTRO DE FE Y ESPERANZA DE BELLO
      </Heading>
      <Subtitle value="REGISTRO DE ASISTENCIA A LAS REUNIONES" id={NAVABAR_LIST.subTitle}/>
    </Flex>
  )
}
