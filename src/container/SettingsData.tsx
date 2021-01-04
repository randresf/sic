import React from "react"
import { useIntl } from "react-intl"
import { Box, Flex, useToast } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import FormikInput from "../components/formElements/FormikInput"
import PrimaryButton from "../components/formElements/PrimaryButton"
import DisplayText from "../components/formElements/DisplayMessage"


const SettingsData = ({children} : any) => {
    const toast = useToast()
    const { formatMessage } = useIntl()

    const onSubmit = async ({...values}: any) => {
        console.log(values)
    }

    return (
        <Box minW="300px">
            <Formik
                enableReinitialize
                initialValues={{
                    firstName: "",
                    lastname: "",
                    phone: 0,
                    email: "",
                    username: "",
                    password: ""
                }}
            onSubmit={onSubmit}
            >
                {({ isSubmitting, setValues, values}) => (
                    <Form style={{width : "100%"}}>
                        <Box>
                            <Flex flexDir="column" w="100%">
                            <FormikInput
                                id="1"
                                label={formatMessage({id: "form.names"})}
                                name="firstName"
                                disabled={false}
                                required
                            />
                            <FormikInput
                                id="2"
                                label={formatMessage({id: "form.lastNames"})}
                                name="lastname"
                                disabled={false}
                                required
                            />
                            <FormikInput
                                id="3"
                                label={formatMessage({id:"form.phone"})}
                                type="number"
                                name="phone"
                                disabled={false}
                                required
                            />
                             <FormikInput
                                id="4"
                                label={formatMessage({id: "form.email"})}
                                name="email"
                                disabled={false}
                                required
                            />
                             <FormikInput
                                id="5"
                                label={formatMessage({id: "form.user"})}
                                name="username"
                                disabled={false}
                                required
                            />
                            <FormikInput
                                id="6"
                                label={formatMessage({id:"form.pwd"})}
                                name="password"
                                disabled={false}
                                required
                            />
                            <Box mt={3}>
                                <PrimaryButton mr={3}  type="submit" isLoading={isSubmitting}>
                                    <DisplayText id="app.buttons.save" defaultMessage="save" />
                                </PrimaryButton>
                                {children}
                            </Box>

                            </Flex>
                        </Box>

                    </Form>
                )}

            </Formik>
        </Box>
    )
}


export default SettingsData