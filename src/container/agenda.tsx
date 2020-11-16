import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const Agenda = (props) => {
  return (
    <Box>
      <Heading as="h2" size="md">
        Proximos eventos:
      </Heading>
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        {props.data && props.data.map(crearReunion)}
      </Flex>
    </Box>
  )
}

export default Agenda

const crearReunion = (reu) => {
  if (!reu) return null
  if (reu.cupos - reu.reservados === 0) return null
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
        {reu.titulo}
      </Heading>
      <Text as="h3" size="md">
        fecha: {reu.fecha}
      </Text>
      <Text as="h3" size="md">
        cupos: {reu.cupos - reu.reservados}
      </Text>
      <Flex flexDir="row-reverse">
        <Link to="/datos">
          <IconButton aria-label="reservar" icon={<ArrowRightIcon />} />
        </Link>
      </Flex>
    </Flex>
  )
}