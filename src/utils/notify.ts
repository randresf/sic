import { createStandaloneToast } from "@chakra-ui/react"

type ToastProps = {
  description?: string
  title: string
  type: "error" | "warning" | "success"
}

const Notify = ({ description = undefined, title, type }: ToastProps) => {
  const toast = createStandaloneToast()
  toast({
    title,
    description,
    status: type,
    duration: 3000,
    isClosable: true,
  })
}

export default Notify
