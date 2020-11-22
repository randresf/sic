import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import { Field } from "formik"

type RadioProps = {
  key: number
  text: string
  name: number
}

const YesNoRadioGroup = ({ text, name, key }: RadioProps) => (
  <Flex justifyItems="center" key={key}>
    <Box w="100%" mb={3} id="my-radio-group">
      {text}
    </Box>
    <Flex
      justifyItems="baseline"
      w="20%"
      role="group"
      aria-labelledby="my-radio-group"
    >
      <Box>
        <label style={{ marginRight: "10px" }}>
          <Field type="radio" name={name} value="1" />
          Si
        </label>
      </Box>
      <Box>
        <label>
          <Field type="radio" name={name} value="0" />
          No
        </label>
      </Box>
    </Flex>
  </Flex>
)

export default YesNoRadioGroup
