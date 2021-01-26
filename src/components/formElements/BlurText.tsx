import { Text } from "@chakra-ui/react"
import React from "react"
import { blurText } from "../../utils/truncate"

type TextProps = {
  text: string
}

const BlurText = ({ text = "", ...rest }: TextProps) => (
  <Text {...rest}>{blurText(text)}</Text>
)
export default BlurText
