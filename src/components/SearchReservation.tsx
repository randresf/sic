import { SearchIcon } from "@chakra-ui/icons"
import { Box, InputGroup, Flex, IconButton } from "@chakra-ui/react"
import { Form } from "formik"
import React from "react"
import { MEETINGS_LIST } from "../ui/formIds"
import FormikInput from "./formElements/FormikInput"
import ShouldRender from "./ShouldRender"

type SearchReservationProps = {
  onChange: () => void
  isLoading: boolean
  searchIcon: boolean
}

export default function SearchReservation({
  onChange,
  isLoading,
  searchIcon,
}: SearchReservationProps) {
  return (
    <InputGroup>
      <Flex flexDir="row" align="flex-end" w="50%">
        <FormikInput
          onBlur={onChange}
          label="Documento"
          name="document"
          required
          id={MEETINGS_LIST.document}
        />
        <ShouldRender if={searchIcon}>
          <IconButton
            aria-label="Search reservation"
            icon={<SearchIcon />}
            type="submit"
            onClick={onChange}
            isLoading={isLoading}
            id={MEETINGS_LIST.btnSearch}
            ml={5}
          />
        </ShouldRender>
      </Flex>
    </InputGroup>
  )
}
