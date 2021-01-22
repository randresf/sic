import React from "react"
import { Box } from "@chakra-ui/react"

type subtitleProps = {
  value: string
  id: string
}
const Subtitle = ({ value, id }: subtitleProps) => {
  return (
    <Box as="h2" id={id} >
      {value}
    </Box>
  )
}

export default Subtitle
