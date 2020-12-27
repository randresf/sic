import { Box, Flex, Checkbox, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import Loading from "../components/formElements/Loading"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import Select from "../components/formElements/Select"
import { useSaveMeetingMutation, useGetPlacesQuery } from "../generated/graphql"
import { useIntl } from "react-intl"
import ShouldRender from "../components/ShouldRender"
import moment from "moment"
import isEmpty from "../utils/isEmpty"
import { formatAgeDate } from "../utils/formatDate"

const MeetingDataForm = ({ children, meeting }: any) => {
  const toast = useToast()
  const [, saveMeeting] = useSaveMeetingMutation()
  const { formatMessage } = useIntl()
  console.log(meeting)
  const initialValues = isEmpty(meeting)
    ? {
        meetingId: "",
        title: "",
        meetingDate: "",
        spots: 0,
        place: "",
      }
    : {
        ...meeting,
        meetingId: meeting.id,
        meetingDate: formatAgeDate(meeting.meetingDate),
        place: meeting.place.id,
      }

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

  const [{ data: placeData, fetching: placeLoading }] = useGetPlacesQuery()

  if (placeLoading) return <Loading loading={placeLoading} />
  return (
    <Box minW="300px">
      <Formik
        enableReinitialize
        initialValues={initialValues}
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
                {/* <FormikInput
                  id="2"
                  label="Lugar"
                  name="place"
                  disabled={false}
                  required
                ></FormikInput> */}
                <ShouldRender if={placeData?.getUserPlaces.place}>
                  <Select
                    id="selec"
                    label="Lugar"
                    place={placeData?.getUserPlaces.place}
                  />
                </ShouldRender>
                <FormikInput
                  id="3"
                  label="Fecha"
                  name="meetingDate"
                  type="date"
                  max="2030-12-31"
                  min={moment().format("YYYY-MM-DD")}
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
                  <Checkbox colorScheme="teal" name="isActive" defaultIsChecked>
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
