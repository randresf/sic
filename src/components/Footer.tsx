import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import React from "react"
import { app_brand } from "../theme/components/general"

const Footer = () => {
  return (
    <Box
      style={{
        position: "fixed",
        textAlign: "center",
        width: "100%",
        bottom: 0,
        borderTop: "1px solid",
        borderTopColor: app_brand.titles,
      }}
    >
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
