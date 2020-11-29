import React from "react"
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import { useMeetingsQuery } from "../generated/graphql"

const Agenda = () => {
  const [{ data, fetching, error }] = useMeetingsQuery()
  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <Heading as="h2" size="md">
        Próximos eventos:
      </Heading>
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        {(error || !data || data.meetings?.length === 0) && (
          <div>no hay reuniones</div>
        )}
        {data && data.meetings && data.meetings.map(crearReunion)}
      </Flex>
    </Box>
  )
}

export default Agenda

const crearReunion = (reu: {
  spots: number
  id: string | number | undefined
  title: string
  meetingDate: string
}) => {
  if (!reu) return null
  return (
    <Flex
      key={reu.id}
      p={3}
      shadow="md"
      borderWidth={1}
      m={2}
      w="270px"
      h="170px"
      flexDir="column"
    >
      {/* <Box mr={3}>
        <CheckboxWrapper
          value={reu.id}
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
      </Box> */}

      <Heading as="h3" size="md">
        {reu.title}
      </Heading>
      <Text as="h3" size="md">
        fecha: {reu.meetingDate}
      </Text>
      <Text as="h3" size="md">
        cupos: {reu.spots}
      </Text>
      <Flex flexDir="row-reverse">
        <Link to={`/datos/${reu.id}`}>
          <Flex alignItems="center">
            <Text mr={3}>Reservar</Text>
            <IconButton aria-label="reservar" icon={<ArrowRightIcon />} />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  )
}
