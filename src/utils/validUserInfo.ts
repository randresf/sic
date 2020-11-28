import { useToast } from "@chakra-ui/react"
import { useParams, useHistory } from "react-router-dom"

const useValidUser = () => {
  const { userId }: any = useParams()
  const history = useHistory()
  const toast = useToast()
  if (userId) return userId
  toast({
    status: "error",
    title: "acceso invalido",
    duration: 4000,
    onCloseComplete: () => history.push("/"),
  })
  return null
}

export default useValidUser
