import React from "react"
import { Box, Center, Flex } from "@chakra-ui/react"
import { Field } from "formik"
import { v4 } from "uuid"
import { QUESTIONS_FORM } from "../ui/formIds"
import DisplayText from "./formElements/DisplayMessage"

type RadioProps = {
  questions: { id: number; question: string }[]
}

const YesNoRadioGroup = ({ questions }: RadioProps) => {
  return (
    <Box>
      {questions.map(({ question, id }) => (
        <Flex justifyItems="center" key={v4()}>
          <Box w="100%" mb={3} className={QUESTIONS_FORM.questionText}>
            {question}
          </Box>
          <Flex role="group" aria-labelledby="my-radio-group" ml={5}>
            <Center>
              <Box>
                <label style={{ marginRight: "10px" }}>
                  <Field
                    className={QUESTIONS_FORM.responseYes}
                    type="radio"
                    name={id}
                    value="1"
                  />
                  <DisplayText id="radio.question.yes" defaultMessage="Yes" />
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    className={QUESTIONS_FORM.responseNo}
                    type="radio"
                    name={id}
                    value="0"
                  />
                  <DisplayText id="radio.question.no" defaultMessage="No" />
                </label>
              </Box>
            </Center>
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}

export default YesNoRadioGroup
