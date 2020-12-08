import React, { useState } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  InputGroup,
  Text,
} from "@chakra-ui/react"
import { ArrowRightIcon, SearchIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import { useMeetingsQuery } from "../generated/graphql"
import FormikInput from "../components/FormikInput"
import { Form, Formik } from "formik"
import { useGetUserMutation } from "../generated/graphql"
import ReservationsList from "./reservationsList"
import { formatDate } from "../utils/formatDate"

const Agenda = () => {
  const [{ data, fetching, error }] = useMeetingsQuery()
  const [, searchUser] = useGetUserMutation()
  const [showInput, setInput] = useState(false)
  const [, setLoading] = useState(false)
  const [userId, setUserId] = useState("")
  const [meetingId, setMeetingId] = useState("")
  const [reservations, setReservations] = useState([])
  const searchReservation = (cb: any) => async (ev: any) => {
    setLoading(true)
    const citizenId = String(ev.target.value)

    const { data } = await searchUser({ citizenId })
    console.log(data)
    if (data?.user?.user) {
      const { id, reservations: prevRes } = data.user.user
      const usrReservations: any = prevRes
      if (usrReservations) setReservations(usrReservations)
      setUserId(id)
      setMeetingId(usrReservations)
    } else {
    }
  }
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
      <Box mt={5}>
        <Button
          colorScheme={showInput ? "gray" : "teal"}
          onClick={() => {
            setInput(!showInput)
            setReservations([])
          }}
        >
          {showInput ? "volver" : "consultar reservas"}
        </Button>
      </Box>

      {showInput && (
        <Box ml={3} mt={3}>
          <Formik
            enableReinitialize
            initialValues={{
              document: "",
            }}
            validate={(values) => {}}
            onSubmit={async ({ ...values }) => {}}
          >
            {({ isSubmitting, setValues, values }) => (
              <Form>
                <Box>
                  <InputGroup>
                    <Flex flexDir="row" align="flex-end" w="50%">
                      <FormikInput
                        onBlur={searchReservation(setValues)}
                        label="Documento"
                        name="document"
                        required
                      ></FormikInput>

                      <IconButton
                        aria-label="Search reservation"
                        icon={<SearchIcon />}
                        type="submit"
                        onClick={searchReservation(setValues)}
                        isLoading={isSubmitting}
                        ml={5}
                      />
                    </Flex>
                  </InputGroup>
                </Box>
                <Box mt={3}>
                  {reservations.length === 0 ? (
                    <Text>no se encontraron reservas</Text>
                  ) : (
                    <ReservationsList
                      reservations={reservations}
                      userId={userId}
                      meetingId={meetingId}
                      cb={() => {
                        searchReservation(setValues)({
                          target: { value: values.document },
                        })
                      }}
                    />
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      )}
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
        fecha: {formatDate(reu.meetingDate)}
      </Text>
      <Text as="h3" size="md">
        cupos: {reu.spots}
      </Text>
      {String(reu.spots) !== "0" && (
        <Flex flexDir="row-reverse">
          <Link to={`/datos/${reu.id}`}>
            <Flex alignItems="center">
              <Text mr={3}>Reservar</Text>
              <IconButton aria-label="reservar" icon={<ArrowRightIcon />} />
            </Flex>
          </Link>
        </Flex>
      )}
    </Flex>
  )
}
