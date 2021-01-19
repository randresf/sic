import React from "react"
import { Heading } from "@chakra-ui/react"

type subtitleProps = {
  value: string
  id: string
}
const Subtitle = ({ value, id }: subtitleProps) => {
  return (
    <Heading size="sm" id={id}>
      {value}
    </Heading>
  )
}

export default Subtitle
