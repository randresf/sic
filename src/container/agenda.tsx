import React from "react"
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { useQuery } from "urql"
import Loading from "../components/Loading"

const MeetinsQuery = `
  query {
    meetings {
      id
      title
      meetingDate
      spots
    }
  }
`

const Agenda = () => {
  const [{ data, fetching, error }] = useQuery({ query: MeetinsQuery })
  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <Heading as="h2" size="md">
        Proximos eventos:
      </Heading>
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        {(error || data.meetings.length === 0) && <div>no hay reuniones</div>}
        {data.meetings && data.meetings.map(crearReunion)}
      </Flex>
    </Box>
  )
}

export default Agenda

const crearReunion = (reu: {
  spots: number
  reservados: number
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
      minW="250px"
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
        <Link to="/datos">
          <IconButton aria-label="reservar" icon={<ArrowRightIcon />} />
        </Link>
      </Flex>
    </Flex>
  )
}
