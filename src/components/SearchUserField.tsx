import { Stack, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useState } from "react"
import { useGetUserMutation } from "../generated/graphql"
import Loading from "./Loading"
import FormikInput from "./FormikInput"

type SearchUserFieldProps = {
  onData: (data: any) => void
}

const SearchUserField = ({ onData, ...props }: SearchUserFieldProps) => {
  const [, searchUser] = useGetUserMutation()
  const [loading, setLoading] = useState(false)

  return (
    <Stack spacing={4}>
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
        <InputRightElement children={<Loading loading={loading} />} />
      </InputGroup>
    </Stack>
  )
}
export default SearchUserField
