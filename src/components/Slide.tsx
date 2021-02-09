import React from "react"
import { Slide } from "@chakra-ui/react"

const Slider = ({ children, direction }: any) => {
  return (
    <Slide
      style={{ position: "initial", transition: "400ms " }}
      direction={direction}
      in={true}
    >
      {children}
    </Slide>
  )
}

export default Slider
