import React from "react"
import { Slide } from "@chakra-ui/react"

const Slider = ({ children, direction }: any) => {
  return (
    <Slide style={{ position: "-moz-initial" }} direction={direction} in={true}>
      {children}
    </Slide>
  )
}

export default Slider
