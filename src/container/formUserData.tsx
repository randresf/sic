import React, { useState } from "react"
import FormikInput from "../components/FormikInput"
import PrimaryButton from "../components/PrimaryButton"
import { Box, Flex, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import isPersonalDataValid from "../utils/isPersonalDataValid"
import { getAgeFromDate } from "../utils/getAgeFromDate"
import { formatDate } from "../utils/formatDate"
import { useSaveUserMutation, useGetUserMutation } from "../generated/graphql"
import { useHistory, useParams } from "react-router-dom"
import ReservationsList from "./reservationsList"

const PersonalDataForm = () => {
  const [age, setAge] = useState("")
  const [userId, setUserId] = useState("")
  const [reservations, setReservations] = useState([])
  const [, searchUser] = useGetUserMutation()
  // const [loading, setLoading] = useState(false)
  const [, saveUser] = useSaveUserMutation()
  const history = useHistory()
  let { meetingId }: any = useParams()
  if (!meetingId) history.push("/")
  const toast = useToast()
  localStorage.setItem("meetingId", meetingId)

  const onBlurCitizenField = (cb: any) => async (ev: any) => {
    ev.preventDefault()
    //setLoading(true)
    const citizenId = String(ev.target.value)
    cb({
      document: citizenId,
      firstName: "",
      lastName: "",
      phone: 0,
      email: "",
      birthDate: "",
    })
    const { data } = await searchUser({ citizenId })
    if (data?.user?.user) {
      const {
        __typename,
        birthDate,
        id,
        reservations: prevRes,
        ...rest
      } = data.user.user
      const formatedDate = formatDate(birthDate)
      cb({ ...rest, birthDate: formatedDate })
      const usrReservations: any = prevRes
      if (usrReservations) setReservations(usrReservations)
      setUserId(id)
    } else {
      cb({ document: citizenId })
    }
    //setLoading(false)
  }

  return (
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

        toast({
          description: "",
          title: "actualizado correctamente",
          status: "success",
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
              />
              <FormikInput label="Nombres" name="firstName" required />
              <FormikInput label="Apellidos" name="lastName" required />
              <FormikInput
                label="Telefono"
                name="phone"
                type="number"
                required
              />
              <FormikInput label="Correo" name="email" required />
              <Flex justifyContent="space-around">
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
                <PrimaryButton
                  type="submit"
                  disabled={reservations.length >= 2}
                  isLoading={isSubmitting}
                >
                  continuar
                </PrimaryButton>
                {userId && (
                  <ReservationsList
                    reservations={reservations}
                    userId={userId}
                    cb={onBlurCitizenField}
                  />
                )}
              </Box>
            </Flex>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default PersonalDataForm
