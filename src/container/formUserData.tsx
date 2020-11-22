import React, { useState } from "react"
import FormikInput from "../components/FormikInput"
import PrimaryButton from "../components/PrimaryButton"
import { Box, Flex, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import isPersonalDataValid from "../utils/isPersonalDataValid"
import { getAgeFromDate } from "../utils/getAgeFromDate"
import SearchUserField from "../components/SearchUserField"
import { formatDate } from "../utils/formatDate"
import {
  useAddUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
} from "../generated/graphql"
import { useHistory, useParams } from "react-router-dom"
import ReservationsList from "./reservationsList"

const PersonalDataForm = () => {
  const [age, setAge] = useState("")
  const [userId, setUserId] = useState("")
  const [reservations, setReservations] = useState([])
  const [, searchUser] = useGetUserMutation()
  // const [loading, setLoading] = useState(false)
  const [, updateUser] = useUpdateUserMutation()
  const [, saveUser] = useAddUserMutation()
  const history = useHistory()
  let { reservationId }: any = useParams()
  if (!reservationId) history.push("/")
  const toast = useToast()
  localStorage.setItem("reservationId", reservationId)

  const onBlurCitizenField = (cb: any) => async (ev: any) => {
    ev.preventDefault()
    //setLoading(true)
    const citizenId = String(ev.target.value)
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
      cb({ citizenId })
    }
    //setLoading(false)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        citizenId: "",
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
        console.log(errors)
        return errors
      }}
      onSubmit={async ({ ...values }) => {
        let data = null
        if (userId) {
          data = await updateUser({ userId, input: { ...values } })
        } else {
          data = await saveUser({ input: { ...values } })
        }
        if (data.error)
          return toast({
            description: data.error.message,
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
        localStorage.setItem("citizenId", values.citizenId)
        return history.push(`/questions/${userId}`)
      }}
    >
      {({ isSubmitting, setValues, values }) => (
        <Form style={{ width: "100%" }}>
          <Box>
            <Flex flexDir="column" w="100%">
              <FormikInput
                onBlur={onBlurCitizenField(setValues)}
                label="Documento"
                name="citizenId"
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
                {reservations && reservations.length < 2 ? (
                  <PrimaryButton
                    type="submit"
                    //disabled={error}
                    isLoading={isSubmitting}
                  >
                    continuar
                  </PrimaryButton>
                ) : (
                  <ReservationsList reservations={reservations} />
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
