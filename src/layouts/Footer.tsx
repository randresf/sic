import { EmailIcon } from "@chakra-ui/icons"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { app_brand } from "../theme/components/general"

const Footer = () => {
  return (
    <Box
      borderTopColor={app_brand.titles}
      padding="0.90rem"
      boxShadow="0 -2px 5px -5px #333"
      display="flex"
    >
      <Flex
        align="flex-start"
        justify={["center", "space-between"]}
        direction={["column", "row", "row", "row"]}
        w="100%"
      >
        <Text ml={2}>© 2021 Aforo </Text>

        <Flex justifyItems="center" align="center">
          <Icon as={EmailIcon} mr="4px" />
          <Box as="a" href={`mailto:aforo.meetings@gmail.com`}>
            aforo.meetings@gmail.com
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
