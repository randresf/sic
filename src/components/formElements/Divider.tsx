import { Divider } from "@chakra-ui/react"
import React from "react"
import { app_brand } from "../../theme/components/general"

const DividerWrapper = (props: any) => {
  return <Divider opacity="1" {...props} borderColor={app_brand.titles} />
}

export default DividerWrapper
