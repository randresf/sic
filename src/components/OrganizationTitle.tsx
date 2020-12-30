import React from "react"
import { NAVABAR_LIST } from "../ui/formIds"
import { Flex, Heading } from "@chakra-ui/react"

export default function OrganizationTitle() {
  return (
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
  )
}
