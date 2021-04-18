import { Flex, Heading, Text } from "@chakra-ui/layout"
import React from "react"
import AccordionTab from "../../components/Accordion"

const PQR = () => {
  return (
    <Flex alignItems="center" flexDir="column" h="100vh">
      <Flex mt={10} alignItems="center" flexDir="column">
        <Heading>Preguntas frecuentes</Heading>
        <Text>Haz tu pregunta y conoce</Text>
      </Flex>
      <Flex mt="10px" flexDir="row">
        <Flex w="50%" flexDir="column">
          <Heading>
            ¿Tiene alguna pregunta? Por favor pregunte aquí estamos listos para
            apoyar
          </Heading>
          <Text>
            Si su pregunta no está en la lista aquí, no dude en hacer un soporte
            manual.
          </Text>
        </Flex>
        <Flex w="50%">
          <AccordionTab />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PQR
