import React from "react"
import { Box, useStyleConfig } from "@chakra-ui/react"

const PrimaryButton = (props: any) => {
  const style = useStyleConfig("PrimaryButton", props)
  return <Box as="button" sx={style} {...props} />
}

export default PrimaryButton
