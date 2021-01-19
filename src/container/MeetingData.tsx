import { Box, Flex, Text, Radio } from "@chakra-ui/react"
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
import DisplayText from "../components/formElements/DisplayMessage"
import Notify from "../utils/notify"
import ModalActions from "../components/ModalActions"

const MeetingDataForm = ({ children, meeting, onChange }: any) => {
  const [, saveMeeting] = useSaveMeetingMutation()
  const { formatMessage } = useIntl()
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

  const onSubmit = async ({ ...values }) => {
    const { meetingId, createdAt, ...data } = values
    const saveMeetingResponse = await saveMeeting({
      meetingId,
      data: data as MeetingInput,
    })
    if (saveMeetingResponse.error) {
      return Notify({
        title: formatMessage({ id: "app.notification.saveMeetingError" }),
        type: "error",
      })
    }
    if (typeof onChange === "function") onChange()
    //window.location.reload()
    Notify({
      title: formatMessage({ id: "app.notification.saveMeetingOk" }),
      type: "success",
    })
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
                  label={formatMessage({ id: "form.title" })}
                  name="title"
                  disabled={false}
                  required
                />
                <ShouldRender if={placeData?.getUserPlaces.place}>
                  <Select
                    id="selec"
                    label={formatMessage({ id: "form.place" })}
                    name="place"
                    placeholder={formatMessage({ id: "form.place" })}
                    options={placeData?.getUserPlaces.place}
                  />
                </ShouldRender>
                <FormikInput
                  id="3"
                  label={formatMessage({ id: "form.date" })}
                  name="meetingDate"
                  type="datetime-local"
                  min={moment().format("yyyy-MM-ddThh:mm")}
                  required
                />
                <FormikInput
                  type="number"
                  id="4"
                  label={formatMessage({ id: "form.spots" })}
                  name="spots"
                  disabled={false}
                  required
                />
                <Box mt={3}>
                  <RadioGroupControl
                    label={formatMessage({ id: "app.label.state" })}
                    name="isActive"
                  >
                    <Radio value="false">
                      <DisplayText
                        id="form.inactive"
                        defaultMessage="Inactive"
                      />
                    </Radio>
                    <Radio value="true">
                      <DisplayText id="form.active" defaultMessage="Active" />
                    </Radio>
                  </RadioGroupControl>
                  <ShouldRender if={String(values.isActive) === "true"}>
                    <Text color="tomato" as="i" fontSize="md" noOfLines={2}>
                      <DisplayText
                        id="app.meetingForm.activeMessage"
                        defaultMessage="When activating the meeting, users will be able to reserve quotas Meetings with reservations cannot be modified / deleted"
                      />
                    </Text>
                  </ShouldRender>
                </Box>
                <ModalActions>
                  {children}
                  <PrimaryButton type="submit" isLoading={isSubmitting}>
                    <DisplayText id="app.buttons.save" defaultMessage="save" />
                  </PrimaryButton>
                </ModalActions>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default MeetingDataForm
