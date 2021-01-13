import React from "react"
import { Heading as ChHeading } from "@chakra-ui/react"

const Heading = (props: any) => (
  <ChHeading as="h3" size="md">
    {props.children}
  </ChHeading>
)

export default Heading
