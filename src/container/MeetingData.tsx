import { Box, Flex, useToast, Text, Radio } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React from "react"
import Loading from "../components/formElements/Loading"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import Select from "../components/formElements/Select"
import {
  useSaveMeetingMutation,
  useGetPlacesQuery,
  MeetingInput,
} from "../generated/graphql"
import { useIntl } from "react-intl"
import ShouldRender from "../components/ShouldRender"
import moment from "moment"
import isEmpty from "../utils/isEmpty"
import { formatAgeDate } from "../utils/formatDate"
import { RadioGroupControl } from "formik-chakra-ui"

const MeetingDataForm = ({ children, meeting }: any) => {
  const toast = useToast()
  const [, saveMeeting] = useSaveMeetingMutation()
  const { formatMessage } = useIntl()
  const initialValues = isEmpty(meeting)
    ? {
        meetingId: "",
        title: "",
        meetingDate: "",
        spots: 0,
        place: "",
        isActive: "false",
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
    console.log(values)
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

  const onSubmit = async ({ ...values }) => {
    const { meetingId, ...data } = values
    const saveMeetingResponse = await saveMeeting({
      meetingId,
      data: data as MeetingInput,
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
  }

  if (placeLoading) return <Loading loading={placeLoading} />
  return (
    <Box minW="300px">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={validateInputs}
        onSubmit={onSubmit}
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
                />
                <ShouldRender if={placeData?.getUserPlaces.place}>
                  <Select
                    id="selec"
                    label="Lugar"
                    name="place"
                    placeholder="lugar"
                    options={placeData?.getUserPlaces.place}
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
                />
                <Box mt={3}>
                  <RadioGroupControl label="Estado" name="isActive">
                    <Radio value="false">Inactive</Radio>
                    <Radio value="true">Active</Radio>
                  </RadioGroupControl>
                  <ShouldRender if={String(values.isActive) === "true"}>
                    <Text color="tomato" as="i" fontSize="md" noOfLines={2}>
                      Al activar la reunion los usuario podran reservar cupos
                      Reuniones con reservas no se pueden modificar/eliminar
                    </Text>
                  </ShouldRender>
                </Box>
                <Box mt={3}>
                  {children}
                  <PrimaryButton type="submit" isLoading={isSubmitting}>
                    guardar
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
