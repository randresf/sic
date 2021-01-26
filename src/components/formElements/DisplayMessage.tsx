import React from "react"
import { FormattedMessage } from "react-intl"

export default function DisplayText(props: any) {
  return (
    <FormattedMessage id={props.id} defaultMessage={props.defaultMessage}/>
  )
}
