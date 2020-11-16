import { Box } from "@chakra-ui/react"
import React from "react"

type wrapper = {
  children: '' | React.ReactNode,
  variant: 'regular' | "small"
}

const Wrapper = ({ children, variant = "regular" }: wrapper) => {
  return (
    <Box mx="auto" maxW={variant === "regular" ? "800px" : "500px"} w="100%">
      {children}
    </Box>
  )
}

export default Wrapper
