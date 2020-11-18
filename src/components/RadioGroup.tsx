import React from "react"
import { Box, Stack, Radio, RadioGroup, Flex } from "@chakra-ui/react"

const WrapperButton = ({ id = 0, question = "" }) => (
  <RadioGroup name="pregunta">
    <Stack spacing={5} direction="row">
      <Flex flexDir="column" w="100%">
        <Box m={3}>{question}</Box>
      </Flex>
      <Radio colorScheme="green" value="1">
        SI
      </Radio>
      <Radio colorScheme="red" value="2">
        NO
      </Radio>
    </Stack>
  </RadioGroup>
)

export default WrapperButton
