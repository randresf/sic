import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import Logo from "../../components/Logo"

const Home = () => {
  return (
    <Flex mt={5} mb={5} flexDir="column" alignItems="center">
      <Box w="100px">
        <Logo />
      </Box>
      <Flex flexDir="column" alignItems="center">
        <Box>Bienvenid@ a Aforo!</Box>
        <Box>La forma mas inteligente de manejar tus eventos</Box>
      </Flex>
      <Flex border="1px solid">
        <img src="/aforoImg.jfif" alt="img"></img>
      </Flex>
    </Flex>
  )
}

export default Home
