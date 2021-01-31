import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { app_brand } from "../theme/components/general"
import { EmailIcon } from "@chakra-ui/icons"

const Footer = () => {
  return (
    <Box
      borderTopColor={app_brand.titles}
      padding="1rem"
      borderTop="1px solid rgb(62, 70, 133)"
      display="flex"
    >
      <Flex ml={2} w="100%" alignContent="center" p={2} flexWrap="wrap">
        <Flex flexGrow={0}>
          <img style={{ width: "25px" }} src="/logoSvg.svg" alt="logo" />
          <Text ml={2}>© 2020 Dnsic </Text>
        </Flex>
      </Flex>
      <Flex w="100%" alignContent="center" p={2} display="contents">
        <Flex alignItems="center">
          <Icon as={EmailIcon} />
          <Text m={2}>aforo.meetings@gmail.com </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
