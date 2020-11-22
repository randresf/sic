import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

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
        <ModalBody>{contenido}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            <Link to="/">Close</Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
