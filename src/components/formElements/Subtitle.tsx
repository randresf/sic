import React, { ReactNode } from "react";
import { Heading, propNames } from "@chakra-ui/react";
import { NAVABAR_LIST } from "../../ui/formIds";

type subtitleProps = {
    value: string
    id: string
}
const Subtitle = ({value, id}:subtitleProps)=> {
    return <Heading as="h2" id={id}>
    {value}
  </Heading>
}

export default Subtitle;