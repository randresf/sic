import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import AddCard from "../../../components/AddCard"

const Admins = () =>{
    return (
        <Box>
            <Flex flex={1} alignItems="center" flexWrap="wrap">
                <AddCard   
                    onClick={() => {
                        console.log("new admin")
                    }}
                />
                


            </Flex>
        </Box>
    )
}

export default Admins