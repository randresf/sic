import { ButtonGroup } from "@chakra-ui/react"
import React from "react"
import DisplayText from "./formElements/DisplayMessage"
import WrapperButton from "./formElements/PrimaryButton"
import { DefaultFun } from "./types"
import NeutralButton from "./formElements/NeutralButton"

type GroupProps = {
  onYes: DefaultFun
  onNo: DefaultFun
  yesLbl?: string
  noLbl?: string
  yesProps?: any
  noProps?: any
}

const YesNoButtonGroup = ({
  onYes,
  onNo,
  yesProps = {},
  noProps = {},
}: GroupProps) => {
  return (
    <ButtonGroup spacing="3">
      <NeutralButton onClick={onNo} {...noProps}>
        <DisplayText id="app.buttons.cancel" defaultMessage="cancel" />
      </NeutralButton>
      <WrapperButton onClick={onYes} colorScheme="purple" {...yesProps}>
        <DisplayText id="app.buttons.continue" defaultMessage="continue" />
      </WrapperButton>
    </ButtonGroup>
  )
}

export default YesNoButtonGroup
