import React from "react"
import { Flex, Heading, Img } from "@chakra-ui/react"
import Layout from "../layouts"
import DisplayText from "../components/formElements/DisplayMessage"

const ErrorPage = () => {
  return (
    <Layout>
      <Flex flexDir="column" w="100%" alignItems="center">
        <Img alignItems="center" maxW="50%" src="/pet.png" alt="petImg" />
        <Heading fontSize={["15px", "25px", "40px"]} mt={[3, 5, 10]}>
          <DisplayText id="app.settings.error" defaultMessage="ERROR 404" />
        </Heading>
        <Heading fontSize={["15px", "25px", "40px"]} mt={[2, 3, 5]}>
          <DisplayText
            id="app.notification.pageNotFound"
            defaultMessage="Page not found"
          />
        </Heading>
      </Flex>
    </Layout>
  )
}

export default ErrorPage
