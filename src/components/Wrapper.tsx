import { Box } from "@chakra-ui/react"
import React from "react"

type wrapper = {
  children: "" | React.ReactNode
  variant: "regular" | "small"
}

const Wrapper = ({ children, variant = "regular" }: wrapper) => {
  return (
    <Box
      mx="auto"
      maxW={variant === "regular" ? "900px" : "500px"}
      w="100%"
      pr={4}
      pl={4}
    >
      {children}
    </Box>
  )
}

export default Wrapper
