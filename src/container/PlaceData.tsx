import { Box, Flex, Radio } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { RadioGroupControl } from "formik-chakra-ui"
import React from "react"
import { useIntl } from "react-intl"
import DisplayText from "../components/formElements/DisplayMessage"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import isEmpty from "../utils/isEmpty"
import Select from "../components/formElements/Select"
import { useAddPlaceMutation } from "../generated/graphql"
import ModalActions from "../components/ModalActions"
import isPlaceDataValid from "../utils/isPlaceDataValid"
import { ADDRESS_VALUES } from "../constants/index"
import Notify from "../utils/notify"
import { formatAddress, jsonAddres } from "../utils/formatAddress"

const PlaceData = ({ children, place }: any) => {
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
      cardinal,
      firstLetter,
      firstWayNumber,
      secondLetter,
      secondWayNumber,
      thirdWayNumber,
      way,
      ...valuesAddress
    } = values
    console.log(valuesAddress)
    const place = await addPlaceMutation({ placeId: id, data: valuesAddress })
    if (place.error) {
      return Notify({
        title: formatMessage({ id: "app.notification.Couldn'tCreatePlace" }),
        type: "error",
      })
    }
    window.location.reload()
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
                      placeholder=" "
                      options={ADDRESS_VALUES?.way}
                    />
                  </Box>
                  <Box w="100%" mr={2}>
                    <FormikInput
                      id="firstWayNumber"
                      label={formatMessage({ id: "form.number" })}
                      name="firstWayNumber"
                      type="number"
                      disabled={false}
                      required
                    />
                  </Box>
                  <Box w="50%" mr={2}>
                    <Select
                      id="firstLetter"
                      label="A"
                      name="firstLetter"
                      placeholder=" "
                      options={ADDRESS_VALUES?.letter}
                    />
                  </Box>
                  <Box w="50%">
                    <Select
                      id="secondLetter"
                      label="B"
                      name="secondLetter"
                      placeholder=" "
                      options={ADDRESS_VALUES?.letter}
                    />
                  </Box>
                </Flex>
                <Flex>
                  <Box w="100%" mr={2}>
                    <FormikInput
                      id="secondWayNumber"
                      type="number"
                      label={formatMessage({ id: "form.number" })}
                      name="secondWayNumber"
                      disabled={false}
                      required
                    />
                  </Box>
                  <Box w="100%" mr={2}>
                    <Select
                      id="cardinal"
                      label="Cardinal"
                      name="cardinal"
                      options={ADDRESS_VALUES?.cardinal}
                    />
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
