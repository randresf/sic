import React from "react"
import { Box, Stack, Radio, RadioGroup, Flex } from "@chakra-ui/react"

type RadioProps = {
  text: string
  name: string
  onChange: (ev: any) => void
}

const YesNoRadioGroup = ({ text, name, onChange }: RadioProps) => (
  <RadioGroup name={name} onChange={onChange}>
    <Stack spacing={5} direction="row">
      <Flex flexDir="column" w="100%">
        <Box m={3}>{text}</Box>
      </Flex>
      <Radio value="1">SI</Radio>
      <Radio value="0">No</Radio>
    </Stack>
  </RadioGroup>
)

export default YesNoRadioGroup
