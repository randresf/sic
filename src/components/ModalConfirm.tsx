import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react"
import React from "react"
import WrapperButton from "./PrimaryButton"

type ModalProps = {
  title: string
  content: string
  isOpen: boolean
  onClose: any
  action: any
}

const ModalConfirmWrapper = ({
  title,
  content,
  onClose,
  isOpen,
  action,
}: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{content}</Text>
        </ModalBody>

        <ModalFooter>
          <WrapperButton
            border="2px"
            borderColor="red.500"
            mr={3}
            onClick={action}
          >
            Cancelar reserva
          </WrapperButton>
          <WrapperButton onClick={onClose}>Cerrar</WrapperButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalConfirmWrapper
