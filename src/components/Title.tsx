import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

export const Title = () => (
  <Flex
    justifyItems="center"
    justifyContent="center"
    flexDir="column"
    mt={2}
    mb={2}
  >
    <Box d="flex">
      <Text style={{ color: "#dc6d6d" }}>
        CENTRO DE FE Y ESPERANZA DE BELLO
      </Text>
      / REGISTRO DE ASISTENCIA A LAS REUNIONES
    </Box>
    <Box>
      Revisa muy bien fecha y la hora de la reunión que vas a seleccionar
    </Box>
  </Flex>
)
