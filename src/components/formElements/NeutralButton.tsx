import React from "react"
import { Box, useStyleConfig } from "@chakra-ui/react"

const NeutralButton = (props: any) => {
  const style = useStyleConfig("DefaultButton", props)
  return <Box as="button" sx={style} {...props} />
}

export default NeutralButton
