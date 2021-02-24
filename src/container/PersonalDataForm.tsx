import { Box, Flex, Spinner, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import { useHistory, useParams } from "react-router-dom"
import DisplayText from "../components/formElements/DisplayMessage"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import ShouldRender from "../components/ShouldRender"
import { useGetUserMutation, useSaveUserMutation } from "../generated/graphql"
import { CITIZEN_FORM } from "../ui/formIds"
import { formatAgeDate } from "../utils/formatDate"
import { getAgeFromDate } from "../utils/getAgeFromDate"
import isPersonalDataValid from "../utils/isPersonalDataValid"
import { blurText } from "../utils/truncate"
import ReservationsList from "./ReservationsList"

const PersonalDataForm = () => {
  const { formatMessage } = useIntl()
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
      localStorage.setItem("userId", id)
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
          const errors = isPersonalDataValid({ ...values, formatMessage })
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
        {({ isSubmitting, setValues }) => (
          <Form style={{ width: "100%" }}>
            <Box>
              <Flex flexDir="column" w="100%">
                <Flex aling="center">
                  <FormikInput
                    onBlur={onBlurCitizenField(setValues)}
                    label={formatMessage({ id: "form.document" })}
                    name="document"
                    disabled={userExists || loading}
                    id={CITIZEN_FORM.document}
                    required
                  />
                  {loading && <Spinner ml="-35px" />}
                </Flex>
                <FormikInput
                  label={formatMessage({ id: "form.names" })}
                  name="firstName"
                  required
                  id={CITIZEN_FORM.firstName}
                  disabled={userExists || loading}
                />
                <FormikInput
                  label={formatMessage({ id: "form.lastNames" })}
                  name="lastName"
                  required
                  id={CITIZEN_FORM.lastName}
                  disabled={userExists || loading}
                />
                <FormikInput
                  label={formatMessage({ id: "form.phone" })}
                  name="phone"
                  type="number"
                  required
                  id={CITIZEN_FORM.phone}
                  disabled={loading}
                />
                <FormikInput
                  label={formatMessage({ id: "form.email" })}
                  name="email"
                  required
                  id={CITIZEN_FORM.email}
                  disabled={loading}
                />
                <Flex justifyContent="space-around">
                  {!userExists && (
                    <FormikInput
                      label={formatMessage({ id: "form.birthDate" })}
                      name="birthDate"
                      type="date"
                      max="2010-12-31"
                      min="1910-01-01"
                      placeholder="yyyy-mm-dd"
                      required
                      disabled={loading}
                      id={CITIZEN_FORM.birthDate}
                      pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
                    />
                  )}
                  <FormikInput
                    label={formatMessage({ id: "form.age" })}
                    name="age"
                    type="number"
                    disabled
                    w="80%"
                    ml={3}
                    value={age}
                    id={CITIZEN_FORM.age}
                  />
                </Flex>
                <Box alignSelf="flex-end" mt={"1.75rem"}>
                  <ShouldRender if={reservations && !booked}>
                    <PrimaryButton
                      type="submit"
                      //disabled={error}
                      isLoading={isSubmitting}
                      id={CITIZEN_FORM.submit}
                    >
                      <DisplayText
                        id="app.buttons.continue"
                        defaultMessage="continue"
                      />
                    </PrimaryButton>
                  </ShouldRender>
                  <ReservationsList
                    reservations={reservations}
                    userId={userId}
                    onChange={onBlurCitizenField(setValues)}
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
