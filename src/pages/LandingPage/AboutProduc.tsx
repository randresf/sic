import { Flex, Heading, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import DownArrow from "../../assets/icons/DownArrow"
import UpArrow from "../../assets/icons/UpArrow"
import DisplayText from "../../components/formElements/DisplayMessage"
import ServiceCard from "../../components/ServiceCard"

const Icons: any = {
  DownArrow: <DownArrow />,
  UpArrow: <UpArrow />,
}

const AboutProduct = () => {
  const [services, setServices] = useState<any[]>([])
  const [PrincipalServices, setPrincipalServices] = useState<any[]>([])

  useEffect(() => {
    const getServices = async () => {
      await fetch("config/Services.json")
        .then(function (res) {
          return res.json()
        })
        .then(function (data) {
          // store Data in State Data Variable
          setServices(data)
        })
        .catch(function (err) {
          console.log(err, " error")
        })
    }

    const getPrincipalServices = async () => {
      await fetch("config/PrincipalServices.json")
        .then(function (res) {
          return res.json()
        })
        .then(function (data) {
          // store Data in State Data Variable
          setPrincipalServices(data)
        })
        .catch(function (err) {
          console.log(err, " error")
        })
    }

    getServices()
    getPrincipalServices()
  }, [])

  return (
    <section id="services">
      <Flex alignItems="center" flexDir="column" h="100vh">
        <Flex mt={10} alignItems="center" flexDir="column">
          <Heading>
            <DisplayText
              id="landing.aboutProduc.title"
              defaultMessage="Capacity characteristics"
            />
          </Heading>
          <Text>
            <DisplayText
              id="landing.aboutProduc.subtitle"
              defaultMessage="features are highlighted here"
            />
          </Text>
        </Flex>
        <Flex justifyContent="center" flexWrap="wrap" mt={10}>
          {services
            ? services.map((item) => (
                <ServiceCard {...item} icon={Icons[item.icon]} />
              ))
            : null}
        </Flex>
        <Flex justifyContent="center" mt="20px" flexDir="row">
          <Flex
            mr="30px"
            w="55%"
            boxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
          >
            <img src="aforoImg.jfif" alt="aforoImg" />
          </Flex>
          <Flex flexDir="column">
            <Heading>
              <DisplayText
                id="landing.aboutProduc.principalTitle"
                defaultMessage="Main characteristics of Aforo"
              />
            </Heading>
            {PrincipalServices
              ? PrincipalServices.map((item) => (
                  <ServiceCard {...item} icon={Icons[item.icon]} />
                ))
              : null}
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}

export default AboutProduct
