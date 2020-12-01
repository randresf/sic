import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Link,
} from "@chakra-ui/react"
import React from "react"

type ModalProps = {
  titulo: string
  contenido: string
  isOpen: boolean
  onClose: any
}

const ModalWrapper = ({ titulo, contenido, isOpen, onClose }: ModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{titulo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {contenido}{" "}
          <Link href="https://www.youtube.com/c/cfebello">
            https://www.youtube.com/c/cfebello
          </Link>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            <Link href="/">Close</Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
