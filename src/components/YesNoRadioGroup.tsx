import React from "react"
import { Box, Stack, Radio, RadioGroup, Flex } from "@chakra-ui/react"
import { Field, Form } from "formik"

type RadioProps = {
  text: string
  name: string
  onChange: (ev: any) => void
}

const YesNoRadioGroup = ({ text, name, onChange }: RadioProps) => (
  <Form>
    <div id="my-radio-group">{text}</div>
    <div role="group" aria-labelledby="my-radio-group">
      <label>
        <Field type="radio" name={text} value="1" />
        Si
      </label>
      <label>
        <Field type="radio" name={text} value="0" />
        No
      </label>
      <div></div>
    </div>
  </Form>
)

export default YesNoRadioGroup
