import { Box, Flex, Heading } from "@chakra-ui/react"
import React from "react"
import Logo from "../../components/Logo"

const Home = () => {
  return (
    <Flex w="100%" h="100vh" flexDir="row" alignItems="center">
      <Flex>
        <img src="/HomeAforo.png" alt="img"></img>
        <Flex
          flexDir="column"
          position="absolute"
          right="0"
          mr="20rem"
          mt="5rem"
          alignItems="center"
        >
          <Heading as="h2" size="3xl" isTruncated>
            Bienvenido a Aforo
          </Heading>
          <Heading as="h5" size="sm">
            Planifica tus reuniones y maneja el aforo
          </Heading>
          <Box w="30%" mt="20px">
            <Logo />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
