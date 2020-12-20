import { SearchIcon } from "@chakra-ui/icons"
import { Box, InputGroup, Flex, IconButton } from "@chakra-ui/react"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import DisplayText from "../components/formElements/DisplayMessage"
import NormalInput from "../components/formElements/NormalInput"
import ShouldRender from "../components/ShouldRender"
import { useGetUserMutation } from "../generated/graphql"
import { MEETINGS_LIST } from "../ui/formIds"
import ReservationsList from "./ReservationsList"

type ReservationSectionState = {
  userId: string
  reservations: any
  citizenId: string
  emptyValue: boolean
  error: boolean
  loading: boolean
}

const initialState = {
  userId: "",
  reservations: null,
  citizenId: "",
  emptyValue: false,
  error: false,
  loading: false,
}
export default function ReservationSection({ showIcon = false }) {
  const { formatMessage } = useIntl()
  const [, searchUser] = useGetUserMutation()
  const [state, setState] = useState<ReservationSectionState>(initialState)

  const { userId, reservations, citizenId, emptyValue, error, loading } = state

  const updateSate = (newValue: any) => {
    setState({ ...initialState, ...newValue })
  }

  const onInputChange = (ev: any) => {
    updateSate({ citizenId: String(ev.target.value) })
  }

  const searchReservation = async (ev: any) => {
    if (!citizenId.trim()) return updateSate({ emptyValue: true })

    updateSate({ loading: true })
    const { data } = await searchUser({ citizenId })
    if (data?.user?.user) {
      const { id, reservations: prevRes = [] } = data.user.user
      localStorage.setItem("userId", id)
      updateSate({
        userId: id,
        reservations: prevRes,
      })
    }
    const errors = data?.user?.errors || []
    if (errors.length > 0) {
      updateSate({ error: true })
    }
  }
  return (
    <Box ml={3} mt={3} id={MEETINGS_LIST.searchSection}>
      <InputGroup>
        <Flex flexDir="row" align="flex-end" w="50%">
          <NormalInput
            onBlur={!showIcon ? searchReservation : undefined}
            label={formatMessage({ id: "form.document" })}
            name="document"
            required
            id={MEETINGS_LIST.document}
            disabled={loading}
            onChange={onInputChange}
          />
          <ShouldRender if={showIcon}>
            <IconButton
              aria-label={formatMessage({ id: "form.searchReservation" })}
              icon={<SearchIcon />}
              onClick={searchReservation}
              isLoading={loading}
              id={MEETINGS_LIST.btnSearch}
              ml={5}
            />
          </ShouldRender>
        </Flex>
      </InputGroup>
      <Box>
        <ShouldRender if={error}>
          <DisplayText
            id="app.errors.noUser"
            defaultMessage="usuario no existe"
          />
        </ShouldRender>
        <ShouldRender if={emptyValue}>
          <DisplayText id="form.required" defaultMessage="campo requerido" />
        </ShouldRender>
      </Box>
      <Box mt={3}>
        <ShouldRender if={reservations && !error && !emptyValue}>
          <ReservationsList reservations={reservations} userId={userId} />
        </ShouldRender>
      </Box>
    </Box>
  )
}
