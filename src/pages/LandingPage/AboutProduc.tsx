import { Flex, Heading, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import DownArrow from "../../assets/icons/DownArrow"
import UpArrow from "../../assets/icons/UpArrow"
import ServiceCard from "../../components/ServiceCard"

const Icons: any = {
  DownArrow: <DownArrow />,
  UpArrow: <UpArrow />,
}

const AboutProduct = () => {
  const [services, setServices] = useState<any[]>([])

  const PrincipalServices = [
    {
      title: "title",
      description:
        "Reciba sus pruebas de información en casa y recolecte una muestra de sus pruebas de progreso.",
      icon: <DownArrow />,
    },
    {
      title: "title 2",
      description:
        "Reciba sus pruebas de información en casa y recolecte una muestra de sus pruebas de progreso.",
      icon: <UpArrow />,
    },
  ]

  useEffect(() => {
    const getServices = async () => {
      await fetch("/Template.json")
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

    getServices()
  }, [services])

  return (
    <section id="services">
      <Flex alignItems="center" flexDir="column" h="100vh">
        <Flex mt={10} alignItems="center" flexDir="column">
          <Heading>Cuáles son las características del producto</Heading>
          <Text>Las características se destacan aquí</Text>
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
            <h1>Hola</h1>
            {PrincipalServices
              ? PrincipalServices.map((item) => <ServiceCard {...item} />)
              : null}
          </Flex>
        </Flex>
      </Flex>
    </section>
  )
}

export default AboutProduct
