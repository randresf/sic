import React from "react"
import { Button } from "@chakra-ui/react"
import { BTN_PROPS } from "../../constants"

const NeutralButton = ({ children, ...rest }: any) => (
  <Button
    size={BTN_PROPS.size}
    w={BTN_PROPS.width}
    h={BTN_PROPS.height}
    p={1}
    style={{
      whiteSpace: "normal",
      wordWrap: "break-word",
    }}
    colorScheme="black"
    variant="outline"
    {...rest}
  >
    {children}
  </Button>
)

export default NeutralButton