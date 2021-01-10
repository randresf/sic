import React, { useState } from "react"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import { Box, Flex, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import isPersonalDataValid from "../utils/isPersonalDataValid"
import { getAgeFromDate } from "../utils/getAgeFromDate"
import { formatAgeDate } from "../utils/formatDate"
import { useSaveUserMutation, useGetUserMutation } from "../generated/graphql"
import { useHistory, useParams } from "react-router-dom"
import ReservationsList from "./ReservationsList"
import Loading from "../components/formElements/Loading"
import { blurText } from "../utils/truncate"
import { CITIZEN_FORM } from "../ui/formIds"
import ShouldRender from "../components/ShouldRender"
import { useIntl } from "react-intl"
import DisplayText from "../components/formElements/DisplayMessage"

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
                <FormikInput
                  onBlur={onBlurCitizenField(setValues)}
                  label={formatMessage({ id: "form.document" })}
                  name="document"
                  disabled={userExists}
                  id={CITIZEN_FORM.document}
                  required
                />
                <FormikInput
                  label={formatMessage({ id: "form.names" })}
                  name="firstName"
                  required
                  id={CITIZEN_FORM.firstName}
                  disabled={userExists}
                />
                <FormikInput
                  label={formatMessage({ id: "form.lastNames" })}
                  name="lastName"
                  required
                  id={CITIZEN_FORM.lastName}
                  disabled={userExists}
                />
                <FormikInput
                  label={formatMessage({ id: "form.phone" })}
                  name="phone"
                  type="number"
                  required
                  id={CITIZEN_FORM.phone}
                />
                <FormikInput
                  label={formatMessage({ id: "form.email" })}
                  name="email"
                  required
                  id={CITIZEN_FORM.email}
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
                <Box mt={3}>
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