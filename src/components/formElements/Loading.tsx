import React from "react"
import { Box, Skeleton } from "@chakra-ui/react"

const Loading = ({
  children,
  loading,
}: {
  children?: string | React.ReactNode
  loading: boolean
}) => {
  return (
    <Box>
      <Skeleton isLoaded={!loading}>{children}</Skeleton>
    </Box>
  )
}

export default Loading
