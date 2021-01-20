import React from "react"
import { Box } from "@chakra-ui/react"
import { app_brand } from "../../theme/components/general"

type subtitleProps = {
  value: string
  id: string
}
const Subtitle = ({ value, id }: subtitleProps) => {
  return (
    <Box as="h2" id={id} color={app_brand.font}>
      {value}
    </Box>
  )
}

export default Subtitle
