import { Box, Flex, Radio, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { RadioGroupControl } from "formik-chakra-ui"
import React from "react"
import { useIntl } from "react-intl"
import DisplayText from "../components/formElements/DisplayMessage"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import Select from "../components/formElements/Select"
import ModalActions from "../components/ModalActions"
import { ADDRESS_VALUES } from "../constants/index"
import { useAddPlaceMutation } from "../generated/graphql"
import { formatAddress, jsonAddres } from "../utils/formatAddress"
import isEmpty from "../utils/isEmpty"
import isPlaceDataValid from "../utils/isPlaceDataValid"
import Notify from "../utils/notify"

const PlaceData = ({ children, place, onDone }: any) => {
  const { formatMessage } = useIntl()
  const [, addPlaceMutation] = useAddPlaceMutation()

  if (!isEmpty(place)) {
    place = Object.assign(place, JSON.parse(place.jsonAddress))
  }

  const initialValues = isEmpty(place)
    ? {
        id: "",
        name: "",
        address: "",
        isActive: "true",
      }
    : {
        ...place,
      }

  const validateInputs = (values: any) => {
    const errors = isPlaceDataValid({ ...values, formatMessage })
    values.address = formatAddress(values)
    return errors
  }

  const onSubmit = async ({ id, ...values }: any) => {
    values.jsonAddress = jsonAddres(values)
    const {
      way,
      firstWayNumber,
      firstcardinal,
      secondWayNumber,
      secondCardinal,
      thirdWayNumber,
      ...valuesAddress
    } = values

    const place = await addPlaceMutation({ placeId: id, data: valuesAddress })
    if (place.error) {
      return Notify({
        title: formatMessage({ id: "app.notification.Couldn'tCreatePlace" }),
        type: "error",
      })
    }
    if (typeof onDone === "function") onDone(true)
    return Notify({
      title: formatMessage({ id: "app.notification.placeCreatedCorrectly" }),
      type: "success",
    })
  }

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
                  label={formatMessage({ id: "form.names" })}
                  name="name"
                  disabled={false}
                  required
                />
                <Flex>
                  <Box w="100%" mr={2}>
                    <Select
                      id="way"
                      label={formatMessage({ id: "form.way" })}
                      name="way"
                      options={ADDRESS_VALUES?.way}
                    />
                  </Box>
                  <Box w="100%" mr={2}>
                    <FormikInput
                      id="firstWayNumber"
                      label={formatMessage({ id: "form.number" })}
                      name="firstWayNumber"
                      disabled={false}
                      required
                    />
                  </Box>
                  <Box w="100%" mr={2}>
                    <Select
                      id="firstcardinal"
                      label="Cardinal"
                      name="firstcardinal"
                      options={ADDRESS_VALUES?.cardinal}
                    />
                  </Box>
                  <Box mt={10} mr={3}>
                    <Text fontSize="20px">#</Text>
                  </Box>
                </Flex>
                <Flex>
                  <Box w="100%" mr={2}>
                    <FormikInput
                      id="secondWayNumber"
                      label={formatMessage({ id: "form.number" })}
                      name="secondWayNumber"
                      disabled={false}
                      required
                    />
                  </Box>
                  <Box w="100%" mr={2}>
                    <Select
                      id="secondCardinal"
                      label="Cardinal"
                      name="secondCardinal"
                      options={ADDRESS_VALUES?.cardinal}
                    />
                  </Box>
                  <Box mt={10} mr={2}>
                    <Text fontSize="25px">-</Text>
                  </Box>
                  <Box w="100%">
                    <FormikInput
                      id="thirdWayNumber"
                      type="number"
                      label={formatMessage({ id: "form.number" })}
                      name="thirdWayNumber"
                      disabled={false}
                    />
                  </Box>
                </Flex>
                <FormikInput
                  id="2"
                  label={formatMessage({ id: "form.finalAddress" })}
                  name="address"
                  disabled={true}
                  required
                />
                <Box mt={3}>
                  <RadioGroupControl
                    label={formatMessage({ id: "app.label.state" })}
                    name="isActive"
                  >
                    <Radio value="false">
                      <DisplayText
                        id="form.inactivePlace"
                        defaultMessage="Inactive"
                      />
                    </Radio>
                    <Radio value="true">
                      <DisplayText
                        id="form.activePlace"
                        defaultMessage="Active"
                      />
                    </Radio>
                  </RadioGroupControl>
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

export default PlaceData
