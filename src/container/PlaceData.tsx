import { Box, Flex, Radio, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { RadioGroupControl } from "formik-chakra-ui"
import React from "react"
import { useIntl } from "react-intl"
import DisplayText from "../components/formElements/DisplayMessage"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import isEmpty from "../utils/isEmpty"
import { useAddPlaceMutation } from "../generated/graphql"

const PlaceData = ({ children, place }: any) => {
  const toast = useToast()
  const { formatMessage } = useIntl()
  const [, addPlaceMutation] = useAddPlaceMutation()
  const initialValues = isEmpty(place)
    ? {
        id: "",
        name: "",
        address: "",
        isActive: "",
      }
    : {
        ...place,
      }

  const validateInputs = (values: any) => {
    const { name, address, isActive } = values
    const errors: any = {}
    if (!name) {
      errors.name = formatMessage({ id: "form.required" })
    }
    if (!address) {
      errors.address = formatMessage({ id: "form.required" })
    }
    if (!isActive) {
      errors.isActive = formatMessage({ id: "form.required" })
    }
    return errors
  }

  const onSubmit = async ({ id, ...values }: any) => {
    const place = await addPlaceMutation({ placeId: id,  data: values })
    if (place.error) {
      return toast({
        title: formatMessage({id: "app.notification.Couldn'tCreatePlace"}),
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    toast({
      title: formatMessage({id:"app.notification.placeCreatedCorrectly"}),
      status: "success",
      duration: 3000,
      isClosable: true,
    })
    window.location.reload()
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
                  label={formatMessage({id: "form.names"})}
                  name="name"
                  disabled={false}
                  required
                />
                <FormikInput
                  id="2"
                  label={formatMessage({id:"form.address"})}
                  name="address"
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
                        defaultMessage="Inactiva"
                      />
                    </Radio>
                    <Radio value="true">
                      <DisplayText id="form.active" defaultMessage="Active" />
                    </Radio>
                  </RadioGroupControl>
                </Box>
                <Box mt={3}>
                  {children}
                  <PrimaryButton type="submit" isLoading={isSubmitting}>
                    <DisplayText id="app.buttons.save" defaultMessage="save" />
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

export default PlaceData
