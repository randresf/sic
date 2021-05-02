import { Box, Flex, Heading } from "@chakra-ui/react"
import React from "react"
import DisplayText from "../../components/formElements/DisplayMessage"
import Logo from "../../components/Logo"

const Home = () => {
  return (
    <section id="banner">
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
              <DisplayText
                id="landing.home.welcome"
                defaultMessage="Welcome to Aforo"
              />
            </Heading>
            <Heading as="h5" size="sm">
              <DisplayText
                id="landing.home.subtitle"
                defaultMessage="Plan your meetings and manage the capacity"
              />
            </Heading>
            <Box w="30%" mt="20px">
              <Logo />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}

export default Home
