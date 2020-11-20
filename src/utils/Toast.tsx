import { useToast } from "@chakra-ui/react"

type ToastProps = {
  description: string
  title: string
  type: "error" | "warning" | "success"
}

const Toast = ({ description, title, type }: ToastProps) => {
  const toast = useToast()
  toast({
    title,
    description,
    status: type,
    duration: 3000,
    isClosable: true,
  })
}

export default Toast
