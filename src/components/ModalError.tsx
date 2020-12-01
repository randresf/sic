import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
        <ModalHeader textAlign="center">{titulo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={3}>
          {contenido}
          <Link
            href="https://www.youtube.com/c/cfebello"
            target="_blank"
            style={{ color: "#62ade2" }}
          >
            cfebello
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
