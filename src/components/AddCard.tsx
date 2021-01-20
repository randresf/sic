import { PlusSquareIcon } from "@chakra-ui/icons"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"
import Card from "./Card"
import IconButton from "./formElements/IconButton"

export default function AddCard(props: any) {
  return (
    <Card border="dashed" className={MEETINGS_LIST.meetingCard}>
      <IconButton
        height="100%"
        id={MEETINGS_LIST.btnNewMeeting}
        aria-label="newMeeting"
        background="none"
        fontSize="50px"
        onClick={props?.onClick}
        icon={<PlusSquareIcon />}
      />
    </Card>
  )
}
