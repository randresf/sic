import React from "react"
import { Button, useStyleConfig } from "@chakra-ui/react"

const PrimaryButton = (props: any) => {
  const style = useStyleConfig("PrimaryButton", props)
  return <Button as="button" sx={style} {...props} />
}

export default PrimaryButton
