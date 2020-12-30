import { InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useState } from "react"
import Loading from "../../components/formElements/Loading"
import NormalInput from "../../components/formElements/NormalInput"
import { useGetUserMutation } from "../../generated/graphql"
import { DASHBOARD_MEETINGS } from "../../ui/formIds"

type SearchUserFieldProps = {
  onData: (data: any) => void
}

const SearchUserField = ({ onData, ...props }: SearchUserFieldProps) => {
  const [, searchUser] = useGetUserMutation()
  const [loading, setLoading] = useState(false)

  const onChange = () => {}

  return (
    <InputGroup>
      <NormalInput
        {...props}
        id={DASHBOARD_MEETINGS.searchMeeting}
        required
        label="Documento"
        name="citizenId"
        onChange={onChange}
        disabled={loading}
      />
      <InputRightElement children={<Loading loading={loading} />} />
    </InputGroup>
  )
}
export default SearchUserField
