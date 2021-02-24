import React from "react"
import { Flex, useStyleConfig } from "@chakra-ui/react"
const Card = (props: any) => {
  const styles = useStyleConfig("Card", props)
  return (
    <Flex sx={styles} {...props}>
      <Flex flexWrap="wrap" flexDir="column" textAlign="left">
        {props.children}
      </Flex>
      {props.actions}
    </Flex>
  )
}
export default Card
