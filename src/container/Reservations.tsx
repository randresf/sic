import { Search2Icon, ViewIcon } from "@chakra-ui/icons"
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { useCallback, useEffect, useState } from "react"
import { useIntl } from "react-intl"
import { useHistory } from "react-router-dom"
import DisplayText from "../components/formElements/DisplayMessage"
import IconButton from "../components/formElements/IconButton"
import ShadowBox from "../components/ShadowBox"
import ShouldRender from "../components/ShouldRender"
import { Reservation, useGetUserMutation } from "../generated/graphql"
import useDebounce from "../hooks/useDebounce"
import ReservationCard from "./ReservationCard"

const Reservations = () => {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const [, searchUser] = useGetUserMutation()
  const [citizenId, setDocument] = useState("")
  const debouced = useDebounce(citizenId, 500)
  const [reservationData, setReservationData] = useState<[Reservation] | any>(
    []
  )

  const searchReservationByDocument = useCallback(
    async (debouced: any) => {
      if (debouced.length >= 7 && debouced.length <= 10) {
        const { data } = await searchUser({ citizenId: debouced })
        if (data?.user.user) {
          setReservationData(data?.user.user.reservations)
        }
      }
    },
    [searchUser]
  )

  useEffect(() => {
    searchReservationByDocument(debouced)
  }, [debouced, searchReservationByDocument])

  return (
    <Flex flexDir="column">
      <InputGroup w={["100%", "50%", "25%"]}>
        <Input
          type="number"
          onChange={(e) => setDocument(e.target.value)}
          placeholder={formatMessage({ id: "form.document" })}
        />
        <InputRightElement children={<Search2Icon color="#3e4685" />} />
      </InputGroup>
      <ShadowBox>
        <ShouldRender if={reservationData.length === 0}>
          <Flex
            alignItems="center"
            w="100%"
            height="500px"
            justifyContent="center"
          >
            <DisplayText
              id="app.reservations.noResults"
              defaultMessage="settings"
            />
          </Flex>
        </ShouldRender>
        <ShouldRender if={reservationData.length !== 0}>
          <Flex flexDir={["column", "column", "row"]} height="100%">
            {reservationData?.map((data: any) => (
              <ReservationCard {...data}>
                <Flex>
                  <IconButton
                    aria-label="reservar"
                    iconType="IconReservation"
                    mr={2}
                    onClick={() => {
                      history.push(`/reservation/${data.id}`)
                    }}
                    icon={<ViewIcon />}
                  />
                </Flex>
              </ReservationCard>
            ))}
          </Flex>
        </ShouldRender>
      </ShadowBox>
    </Flex>
  )
}

export default Reservations
