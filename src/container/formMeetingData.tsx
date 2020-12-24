import { Box, Flex, Checkbox, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import Loading from "../components/formElements/Loading"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import {
  useGetMeetingQuery,
  useSaveMeetingMutation,
} from "../generated/graphql"
import { useIntl } from "react-intl"

const MeetingDataForm = ({ children, meeting }: any) => {
  const [loading] = useState(false)
  const toast = useToast()
  const [, saveMeeting] = useSaveMeetingMutation()
  const { formatMessage } = useIntl()

  const validateInputs = (values: any) => {
    const { title, meetingDate, spots, place } = values
    const errors: any = {}

    if (!place) {
      errors.place = formatMessage({ id: "form.required" })
    }

    if (!title) {
      errors.title = formatMessage({ id: "form.required" })
    }

    if (!meetingDate) {
      errors.meetingDate = formatMessage({ id: "form.required" })
    }

    if (!spots) {
      errors.spots = formatMessage({ id: "form.required" })
    }

    return errors
  }

  const [{ data: meetingData }] = useGetMeetingQuery({
    variables: { id: meeting },
  })

  return (
    <Box minW="300px">
      <Loading loading={loading} />
      <Formik
        enableReinitialize
        initialValues={{
          meetingId: meeting ? meeting : "",
          title: meetingData?.meeting.meeting
            ? meetingData?.meeting.meeting?.title
            : "",
          meetingDate: meetingData?.meeting.meeting
            ? meetingData?.meeting.meeting?.meetingDate
            : "",
          spots: meetingData?.meeting.meeting
            ? meetingData?.meeting.meeting?.spots
            : 1,
          place: "",
        }}
        validate={(values) => {
          const errors = validateInputs(values)
          return errors
        }}
        onSubmit={async ({ ...values }) => {
          const { meetingId, ...data } = values
          const saveMeetingResponse = await saveMeeting({
            meetingId,
            data,
          })
          if (saveMeetingResponse.error) {
            return toast({
              title: "no se pudo guardar la reunion",
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          }
          toast({
            title: "se guardo la reunión",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          window.location.reload()
        }}
      >
        {({ isSubmitting, setValues, values }) => (
          <Form style={{ width: "100%" }}>
            <Box>
              <Flex flexDir="column" w="100%">
                <FormikInput
                  id="1"
                  label="Titulo"
                  name="title"
                  disabled={false}
                  required
                ></FormikInput>
                <FormikInput
                  id="2"
                  label="Lugar"
                  name="place"
                  disabled={false}
                  required
                ></FormikInput>
                <FormikInput
                  id="3"
                  label="Fecha"
                  name="meetingDate"
                  type="date"
                  max="2030-12-31"
                  min="2020-01-01"
                  placeholder="yyyy-mm-dd"
                  required
                  pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])/(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])/(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
                />
                <FormikInput
                  type="number"
                  id="4"
                  label="Cupos"
                  name="spots"
                  disabled={false}
                  required
                ></FormikInput>
                <Box mt={3}>
                  <Checkbox colorScheme="teal" defaultIsChecked>
                    Activa
                  </Checkbox>
                </Box>
                <Box mt={3}>
                  {children}
                  <PrimaryButton
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="teal"
                  >
                    Guardar
                  </PrimaryButton>
                </Box>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default MeetingDataForm
