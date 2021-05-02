import { Flex, Text } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import Heading from "./formElements/Heading"

const ServiceCard = ({ title, description, icon }: any) => {
  const [color, SetColor] = useState("")

  useEffect(() => {
    const random_bg_color = () => {
      var x = Math.floor(Math.random() * 256)
      var y = Math.floor(Math.random() * 256)
      var z = Math.floor(Math.random() * 256)
      var bgColor = "rgb(" + x + "," + y + "," + z + ")"
      SetColor(bgColor)
    }

    random_bg_color()
  }, [])

  return (
    <Flex w="380px" m="15px" flexDir="row">
      <Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          background={color}
          w="80px"
          h="80px"
          borderRadius="30px"
          boxShadow="0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
        >
          {icon}
        </Flex>
      </Flex>
      <Flex ml="20px" flexDir="column">
        <Heading mb="10px">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </Flex>
  )
}

export default ServiceCard
