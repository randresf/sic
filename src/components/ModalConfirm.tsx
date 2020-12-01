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
  title?: string
  content: string
  isOpen: boolean
  onClose: any
  action: any
}

const ModalConfirmWrapper = ({
  title = "",
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
          <WrapperButton fontSize={14} onClick={action} colorScheme="teal">
            cancelar
          </WrapperButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalConfirmWrapper
