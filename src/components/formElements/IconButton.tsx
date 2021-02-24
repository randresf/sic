import React from "react"
import { IconButton, useStyleConfig } from "@chakra-ui/react"

export default function IconButtonWrapper({ iconType, ...props }: any) {
  const style = useStyleConfig(iconType, props)
  return <IconButton sx={style} {...props} />
}
