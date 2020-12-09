import React, { useState } from "react"
import FormikInput from "../components/FormikInput"
import PrimaryButton from "../components/PrimaryButton"
import { Box, Flex, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import isPersonalDataValid from "../utils/isPersonalDataValid"
import { getAgeFromDate } from "../utils/getAgeFromDate"
import { formatAgeDate } from "../utils/formatDate"
import { useSaveUserMutation, useGetUserMutation } from "../generated/graphql"
import { useHistory, useParams } from "react-router-dom"
import ReservationsList from "./reservationsList"
import Loading from "../components/Loading"
import { blurText } from "../utils/truncate"

const PersonalDataForm = () => {
  const [age, setAge] = useState("")
  const [userId, setUserId] = useState("")
  const [userExists, setExist] = useState(false)
  const [reservations, setReservations] = useState([])
  const [, searchUser] = useGetUserMutation()
  const [loading, setLoading] = useState(false)
  const [, saveUser] = useSaveUserMutation()
  const history = useHistory()
  let { meetingId }: any = useParams()
  if (!meetingId) history.push("/")
  const toast = useToast()
  localStorage.setItem("meetingId", meetingId)

  const booked = reservations.find(
    ({ meetingId: id }: any): any => id === meetingId
  )

  const onBlurCitizenField = (cb: any) => async (ev: any) => {
    setLoading(true)
    const citizenId = String(ev.target.value)
    const { data } = await searchUser({ citizenId })
    if (data?.user?.user) {
      setExist(true)
      const {
        document,
        firstName,
        lastName,
        __typename,
        birthDate,
        id,
        reservations: prevRes,
        ...rest
      } = data.user.user
      const formatedDate = formatAgeDate(birthDate)
      cb({
        document: blurText(document),
        firstName: blurText(firstName),
        lastName: blurText(lastName),
        ...rest,
        birthDate: formatedDate,
      })
      const usrReservations: any = prevRes
      if (usrReservations) setReservations(usrReservations)
      setUserId(id)
    }
    setLoading(false)
  }

  return (
    <Box minW="300px">
      <Loading loading={loading} />
      <Formik
        enableReinitialize
        initialValues={{
          document: "",
          firstName: "",
          lastName: "",
          phone: 0,
          email: "",
          birthDate: "",
        }}
        validate={(values) => {
          const errors = isPersonalDataValid(values)
          if (values.birthDate) {
            const age = getAgeFromDate(values.birthDate)
            setAge(String(age))
          }
          return errors
        }}
        onSubmit={async ({ ...values }) => {
          let response = await saveUser({ input: { ...values }, userId })
          if (response.error)
            return toast({
              description: response.error.message,
              title: "ocurrio un error",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          return history.push(
            `/questions/${userId || response.data?.saveUser.user?.id}`
          )
        }}
      >
        {({ isSubmitting, setValues, values }) => (
          <Form style={{ width: "100%" }}>
            <Box>
              <Flex flexDir="column" w="100%">
                <FormikInput
                  onBlur={onBlurCitizenField(setValues)}
                  label="Documento"
                  name="document"
                  disabled={userExists}
                  required
                />
                <FormikInput
                  label="Nombres"
                  name="firstName"
                  required
                  disabled={userExists}
                />
                <FormikInput
                  label="Apellidos"
                  name="lastName"
                  required
                  disabled={userExists}
                />
                <FormikInput
                  label="Telefono"
                  name="phone"
                  type="number"
                  required
                />
                <FormikInput label="Correo" name="email" required />
                <Flex justifyContent="space-around">
                  {!userExists && (
                    <FormikInput
                      label="Fecha de nacimiento"
                      name="birthDate"
                      type="date"
                      max="2010-12-31"
                      min="1910-01-01"
                      placeholder="yyyy-mm-dd"
                      required
                      pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
                    />
                  )}
                  <FormikInput
                    label="Edad"
                    name="age"
                    type="number"
                    disabled
                    w="80%"
                    ml={3}
                    value={age}
                  />
                </Flex>
                <Box mt={3}>
                  {reservations && reservations.length < 3 && !booked && (
                    <PrimaryButton
                      type="submit"
                      //disabled={error}
                      isLoading={isSubmitting}
                    >
                      continuar
                    </PrimaryButton>
                  )}

                  <ReservationsList
                    reservations={reservations}
                    userId={userId}
                    meetingId={meetingId}
                    cb={() => {
                      onBlurCitizenField(setValues)({
                        target: { value: values.document },
                      })
                    }}
                  />
                </Box>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default PersonalDataForm
