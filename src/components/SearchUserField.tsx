import { CheckIcon } from "@chakra-ui/icons"
import { Stack, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useState } from "react"
import { useGetUserMutation } from "../generated/graphql"
import Loading from "./Loading"
import NormalInput from "./NormalInput"

type SearchUserFieldProps = {
  onData: (data: any) => void
}

const SearchUserField = ({ onData }: SearchUserFieldProps) => {
  const [, searchUser] = useGetUserMutation()
  const [loading, setLoading] = useState(false)
  return (
    <Stack spacing={4}>
      <InputGroup>
        <NormalInput
          label="Cedula"
          name="cedula"
          type="number"
          onBlur={async (ev: any) => {
            ev.preventDefault()
            setLoading(true)
            const citizenId = String(ev.target.value)
            const { data } = await searchUser({ citizenId })
            if (data?.user) onData(data?.user?.user)
            setLoading(false)
          }}
        />
        <InputRightElement children={<Loading loading={loading} />} />
      </InputGroup>
    </Stack>
  )
}
export default SearchUserField
