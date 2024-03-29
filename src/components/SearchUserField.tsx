import { InputGroup, InputRightElement, Spinner } from "@chakra-ui/react"
import React, { useState } from "react"
import { useGetUserMutation } from "../generated/graphql"
import FormikInput from "./formElements/FormikInput"

type SearchUserFieldProps = {
  onData: (data: any) => void
}

const SearchUserField = ({ onData, ...props }: SearchUserFieldProps) => {
  const [, searchUser] = useGetUserMutation()
  const [loading, setLoading] = useState(false)

  return (
    <InputGroup>
      <FormikInput
        {...props}
        required
        label="Documento"
        name="citizenId"
        type="number"
        onBlur={async (ev: any) => {
          ev.preventDefault()
          setLoading(true)
          const citizenId = String(ev.target.value)
          const { data } = await searchUser({ citizenId })
          if (data?.user?.user) {
            const { __typename, ...rest } = data.user.user
            onData(rest)
          } else {
            onData({ citizenId })
          }
          setLoading(false)
        }}
      />
      <InputRightElement children={loading ? <Spinner /> : null} />
    </InputGroup>
  )
}
export default SearchUserField
