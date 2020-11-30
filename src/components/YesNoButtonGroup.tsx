import { ButtonGroup } from "@chakra-ui/react"
import React from "react"
import WrapperButton from "./PrimaryButton"
import { DefaultFun } from "./types"

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
  yesLbl = "continuar",
  noLbl = "cancelar",
  yesProps = {},
  noProps = {},
}: GroupProps) => {
  return (
    <ButtonGroup spacing="3">
      <WrapperButton onClick={onNo} {...noProps}>
        {noLbl}
      </WrapperButton>
      <WrapperButton onClick={onYes} colorScheme="teal" {...yesProps}>
        {yesLbl}
      </WrapperButton>
    </ButtonGroup>
  )
}

export default YesNoButtonGroup
