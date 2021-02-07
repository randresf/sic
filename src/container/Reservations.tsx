import React from "react"
import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import ShouldRender from "../components/ShouldRender"
import DisplayText from "../components/formElements/DisplayMessage"
import { useIntl } from "react-intl"

const Reservations = () => {
  const { formatMessage } = useIntl()

  const searchReservationByDocument = (e: any) => {
    const value = e.target.value
    if (value.length >= 7 && value.length <= 10) {
      console.log("buscar")
    }
  }

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
        <ShouldRender if={true}>
          <Flex w="100%" height="500px" justifyContent="center">
            <DisplayText
              id="app.reservations.noResults"
              defaultMessage="settings"
            />
          </Flex>
        </ShouldRender>
      </Flex>
    </Flex>
  )
}

export default Reservations
