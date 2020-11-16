import { Box } from "@chakra-ui/react"
import React from "react"

const Wrapper = ({ children, variant = "regular" }) => {
  return (
    <Box mx="auto" maxW={variant === "regular" ? "800px" : "500px"} w="100%">
      {children}
    </Box>
  )
}

export default Wrapper
