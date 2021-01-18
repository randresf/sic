import React from "react"
import { Heading as ChHeading } from "@chakra-ui/react"

const Heading = (props: any) => (
  <ChHeading as="h1">
    {props.children}
  </ChHeading>
)

export default Heading
