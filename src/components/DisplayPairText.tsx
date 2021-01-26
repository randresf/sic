import React, { ReactNode } from "react"
import { Flex } from "@chakra-ui/react"
import { MEETINGS_LIST } from "../ui/formIds"
import BoldText from "./formElements/BoldText"
import Text from "./formElements/Text"

const DisplayPair = ({
  bold,
  text,
}: {
  bold: ReactNode | string
  text: string
}) => {
  return (
    <Flex flexDir="column" justifyContent="space-between" maxWidth="90%">
      <BoldText className={MEETINGS_LIST.spots}>{bold}</BoldText>
      <Text isTruncated>{text}</Text>
    </Flex>
  )
}

export default DisplayPair
