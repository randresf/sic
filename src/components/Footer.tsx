import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import React from "react"

const Footer = () => {
  return (
    <Box
      style={{
        position: "fixed",
        textAlign: "center",
        width: "100%",
        bottom: 0,
      }}
    >
      <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Flex ml={2} w="100%" alignContent="center" p={2} flexWrap="wrap">
        <Box flexGrow={0}>
          <img style={{ width: "25px" }} src="/logoSvg.svg" alt="logo" />
        </Box>
        <Box>
          <Text ml={2}>© 2020 Dnsic </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer
