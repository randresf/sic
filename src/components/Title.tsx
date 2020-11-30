import React from "react"
import { Box, Flex, Heading } from "@chakra-ui/react"

export const Title = () => (
  <Flex
    justifyItems="flex-start"
    justifyContent="center"
    flexDir="column"
    mt={2}
    mb={2}
  >
    <Box>
      <Heading as="h3" size="md">
        Revisa muy bien fecha y la hora de la reunión que vas a seleccionar
      </Heading>
    </Box>
  </Flex>
)
