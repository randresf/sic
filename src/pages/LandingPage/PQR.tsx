import { Accordion } from "@chakra-ui/accordion"
import { Flex, Heading, Text } from "@chakra-ui/layout"
import React from "react"
import AccordionTab from "../../components/Accordion"
import DisplayText from "../../components/formElements/DisplayMessage"

const PQR = () => {
  const data = [
    { title: "prueba", content: "content" },
    { title: "prueba", content: "content" },
  ]

  return (
    <section id="PQR">
      <Flex alignItems="center" flexDir="column" h="70vh">
        <Flex mt={10} alignItems="center" flexDir="column">
          <Heading>
            <DisplayText
              id="landing.pqr.title"
              defaultMessage="Frequent questions"
            />
          </Heading>
          <Text>
            <DisplayText
              id="landing.pqr.subtitle"
              defaultMessage="Ask your question and know"
            />
          </Text>
        </Flex>
        <Flex mt="10px" flexDir="row">
          <Flex w="50%" textAlign="center" flexDir="column">
            <Heading>
              <DisplayText
                id="landing.pqr.introduction"
                defaultMessage="Do you have any questions? Please ask here we are ready to support"
              />
            </Heading>
            <Text>
              <DisplayText
                id="landing.pqr.resume"
                defaultMessage="If your question is not listed here, feel free to do manual support"
              />
            </Text>
          </Flex>
          <Flex mt="30px" w="50%">
            <Accordion w="100%">
              {data ? data.map((item) => <AccordionTab {...item} />) : null}
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}

export default PQR
