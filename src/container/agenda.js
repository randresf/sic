import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const Agenda = () => {
  return (
    <Box>
      <Heading as="h2" size="md">
        Proximos eventos:
      </Heading>
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        {data && data.map(crearReunion)}
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

const data = [
  {
    id: 1,
    titulo: "toom 1",
    cupos: 100,
    reservados: 20,
    fecha: "Noviembre 15, 8 pm",
  },
  {
    id: 2,
    titulo: "toom 2",
    cupos: 100,
    reservados: 20,
    fecha: "Noviembre 15, 8 pm",
  },

  {
    id: 3,
    titulo: "toom 3",
    cupos: 200,
    reservados: 20,
    fecha: "Noviembre 16, 8 pm",
  },
  {
    id: 4,
    titulo: "toom 4",
    cupos: 130,
    reservados: 20,
    fecha: "Noviembre 17, 8 pm",
  },
  {
    id: 5,
    titulo: "toom 5",
    cupos: 140,
    reservados: 20,
    fecha: "Noviembre 18, 8 pm",
  },
  {
    id: 6,
    titulo: "toom 6",
    cupos: 10,
    reservados: 10,
    fecha: "Noviembre 19, 8 pm",
  },
]
