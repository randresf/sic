import React from "react"
import { Box, Flex } from "@chakra-ui/react"
import { Field } from "formik"
import { v4 } from "uuid"

type RadioProps = {
  questions: { id: number; question: string }[]
}

const YesNoRadioGroup = ({ questions }: RadioProps) => {
  return (
    <Box>
      {questions.map(({ question, id }) => (
        <Flex justifyItems="center" key={v4()}>
          <Box w="100%" mb={3} id="my-radio-group">
            {question}
          </Box>
          <Flex
            justifyItems="baseline"
            w="20%"
            role="group"
            aria-labelledby="my-radio-group"
          >
            <Box>
              <label style={{ marginRight: "10px" }}>
                <Field type="radio" name={id} value="1" />
                Si
              </label>
            </Box>
            <Box>
              <label>
                <Field type="radio" name={id} value="0" />
                No
              </label>
            </Box>
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}

export default YesNoRadioGroup
