import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import React from "react"
import ModalActions from "./ModalActions"

type ModalProps = {
  titulo: string
  contenido: any
  isOpen: boolean
  onClose: any
  actions?: React.ReactNode
}

const ModalWrapper = ({
  titulo,
  contenido,
  isOpen,
  onClose,
  actions,
}: ModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent justifyContent="start">
        <ModalHeader>{titulo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{contenido}</ModalBody>
        <ModalActions>{actions}</ModalActions>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
