import React from "react"
import { Flex, useStyleConfig } from "@chakra-ui/react"
const Card = (props: any) => {
  const styles = useStyleConfig("Card", props)
  return (
    <Flex sx={styles} {...props}>
      {props.children}
    </Flex>
  )
}
export default Card
