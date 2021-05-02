import { Flex, Heading, Select, Text } from "@chakra-ui/react"
import React from "react"
import { useHistory } from "react-router-dom"
import CarouselImg from "../../components/Carousel"
import DisplayText from "../../components/formElements/DisplayMessage"
import { useHeartbeatQuery } from "../../generated/graphql"

export const ClientListPage = () => {
  const [{ data }] = useHeartbeatQuery()
  const history = useHistory()
  console.log(data)
  if (data && data.heartBeat) {
    history.replace("/dashboard")
  }

  const slides = [
    {
      title: "Machu Picchu",
      subtitle: "Peru",
      description: "Adventure is never far away",
      image:
        "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      title: "Chamonix",
      subtitle: "France",
      description: "Let your dreams come true",
      image:
        "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      title: "Mimisa Rocks",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      title: "Four",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      title: "Five",
      subtitle: "Australia",
      description: "A piece of heaven",
      image:
        "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
  ]

  return (
    <section id="customers">
      <Flex alignItems="center" flexDir="column" h="100vh" mt="50px">
        <Flex mt={10} alignItems="center" flexDir="column">
          <Heading>
            <DisplayText
              id="landing.clientListPage.title"
              defaultMessage="Some clients of Aforo"
            />
          </Heading>
          <Text>
            <DisplayText
              id="landing.clientListPage.subtitle"
              defaultMessage="They have our services and they are already controlling their Aforo"
            />
          </Text>
        </Flex>
        {/* <Select onChange={() => {}}>
        <option>client 1</option>
      </Select> */}
        <CarouselImg slides={slides} />
      </Flex>
    </section>
  )
}
