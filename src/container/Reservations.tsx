import React from "react"
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react"
import { ArrowRightIcon, Search2Icon } from "@chakra-ui/icons"
import ShouldRender from "../components/ShouldRender"
import DisplayText from "../components/formElements/DisplayMessage"
import { useIntl } from "react-intl"
import { useGetUserMutation } from "../generated/graphql"
import { useState } from "react"
import isEmpty from "../utils/isEmpty"
import ReservationCard from "./ReservationCard"
import IconButton from "../components/formElements/IconButton"

const Reservations = () => {
  const { formatMessage } = useIntl()
  const [, searchUser] = useGetUserMutation()
  const [reservationData, setReservationData] = useState([{}])

  const searchReservationByDocument = async (e: any) => {
    const value = e.target.value
    if (value.length >= 7 && value.length <= 10) {
      const { data } = await searchUser({ citizenId: value })
      if (data?.user.user) {
        setReservationData(data?.user.user.reservations)
      }
    }
  }

  console.log(...reservationData)

  return (
    <Flex flexDir="column">
      <InputGroup w={["100%", "50%", "25%"]}>
        <Input
          type="number"
          onChange={(e) => searchReservationByDocument(e)}
          placeholder={formatMessage({ id: "form.document" })}
        />
        <InputRightElement children={<Search2Icon color="#3e4685" />} />
      </InputGroup>
      <Flex
        mt={5}
        border="1px solid #606060 "
        flex={1}
        alignItems="center"
        flexDir="column"
      >
        <ShouldRender if={isEmpty(reservationData)}>
          <Flex w="100%" height="500px" justifyContent="center">
            <DisplayText
              id="app.reservations.noResults"
              defaultMessage="settings"
            />
          </Flex>
        </ShouldRender>
        <ShouldRender if={!isEmpty(reservationData)}>
          {reservationData?.map(({ ...reservationData }) => (
            <Flex mt="-10rem">
              <ReservationCard {...reservationData}>
                <Flex mt={"-15px"}>
                  <IconButton
                    aria-label="reservar"
                    iconType="IconReservation"
                    icon={<ArrowRightIcon />}
                  />
                  <IconButton
                    aria-label="reservar"
                    iconType="IconReservation"
                    icon={<ArrowRightIcon />}
                  />
                </Flex>
              </ReservationCard>
            </Flex>
          ))}
        </ShouldRender>
      </Flex>
    </Flex>
  )
}

export default Reservations
