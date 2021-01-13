import { InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useState } from "react"
import Loading from "../../components/formElements/Loading"
import NormalInput from "../../components/formElements/NormalInput"
import { useGetUserMutation, useMeetingsQuery } from "../../generated/graphql"
import { DASHBOARD_MEETINGS } from "../../ui/formIds"

type SearchMeetingFieldProps = {
  onData: (data: any) => void
}

const SearchMeetingField = ({ onData, ...props }: SearchMeetingFieldProps) => {
  const [, searchMeeting] = useMeetingsQuery()
  const [loading, setLoading] = useState(false)

  const onChange = () => {}

  return (
    <InputGroup>
      <NormalInput
        {...props}
        id={DASHBOARD_MEETINGS.searchMeeting}
        required
        label="Meeting"
        name="title"
        onChange={onChange}
        disabled={loading}
      />
      <InputRightElement children={<Loading loading={loading} />} />
    </InputGroup>
  )
}
export default SearchMeetingField
