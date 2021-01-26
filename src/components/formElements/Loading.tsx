import React from "react"
import { Skeleton } from "@chakra-ui/react"

const Loading = ({
  children,
  loading,
}: {
  children?: string | React.ReactNode
  loading: boolean
}) => {
  return <Skeleton isLoaded={!loading}>{children}</Skeleton>
}

export default Loading
