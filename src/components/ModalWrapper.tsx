import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import React from "react"

type ModalProps = {
  titulo: string
  contenido: any
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
        <ModalBody mb={3}>{contenido}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper