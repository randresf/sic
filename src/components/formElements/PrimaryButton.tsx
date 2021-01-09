import React from "react"
import { Button } from "@chakra-ui/react"
import { BTN_PROPS } from "../../constants"

const PrimaryButton = ({ children, ...rest }: any) => (
  <Button
    size={BTN_PROPS.size}
    colorScheme={BTN_PROPS.colorSchema}
    w={BTN_PROPS.width}
    h={BTN_PROPS.height}
    {...rest}
    p={1}
    style={{
      whiteSpace: "normal",
      wordWrap: "break-word",
    }}
  >
    {children}
  </Button>
)

export default PrimaryButton
