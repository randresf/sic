import { Box } from "@chakra-ui/react"
import React from "react"

const ShadowBox = ({ children }: any) => {
  return (
    <Box
      mt={5}
      boxShadow="0 0px 10px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);"
      flex={1}
      alignItems="center"
      height="500px"
      flexDir={["column", "column", "row"]}
    >
      {children}
    </Box>
  )
}

export default ShadowBox
