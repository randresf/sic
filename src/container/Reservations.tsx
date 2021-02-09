import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { Search2Icon, ViewIcon } from "@chakra-ui/icons"
import ShouldRender from "../components/ShouldRender"
import DisplayText from "../components/formElements/DisplayMessage"
import { useIntl } from "react-intl"
import { useGetUserMutation, Reservation } from "../generated/graphql"
import ReservationCard from "./ReservationCard"
import IconButton from "../components/formElements/IconButton"
import useDebounce from "../hooks/useDebounce"
import { useEffect } from "react"

const Reservations = () => {
  const { formatMessage } = useIntl()
  const history = useHistory()
  const [, searchUser] = useGetUserMutation()
  const [citizenId, setDocument] = useState("")
  const debouced = useDebounce(citizenId, 500)
  const [reservationData, setReservationData] = useState<[Reservation] | any>(
    []
  )

  useEffect(() => {
    searchReservationByDocument(debouced)
  }, [debouced])

  const searchReservationByDocument = async (debouced: any) => {
    if (debouced.length >= 7 && debouced.length <= 10) {
      const { data } = await searchUser({ citizenId: debouced })
      if (data?.user.user) {
        setReservationData(data?.user.user.reservations)
      }
    }
  }

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
      <Flex
        mt={5}
        border="1px solid #606060 "
        flex={1}
        alignItems="center"
        height="500px"
        flexDir={["column", "column", "row"]}
      >
        <ShouldRender if={reservationData.length === 0}>
          <Flex w="100%" height="500px" justifyContent="center">
            <Box>
              <DisplayText
                id="app.reservations.noResults"
                defaultMessage="settings"
              />
            </Box>
          </Flex>
        </ShouldRender>
        <ShouldRender if={reservationData.length !== 0}>
          {reservationData?.map((data: any) => (
            <Flex height={["250px", "250px", "500px"]}>
              <Box>
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
                    {/* <IconButton
                      aria-label="reservar"
                      iconType="IconReservation"
                      icon={<DeleteIcon />}
                    /> */}
                  </Flex>
                </ReservationCard>
              </Box>
            </Flex>
          ))}
        </ShouldRender>
      </Flex>
    </Flex>
  )
}

export default Reservations
