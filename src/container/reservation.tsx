import React, { useState } from "react"
import {
  Box,
  Flex,
  Text,
  Heading,
  useDisclosure,
  useToast,
  Stack,
} from "@chakra-ui/react"
import Loading from "../components/Loading"
import {
  useSearchReservationQuery,
  useCancelReservationMutation,
} from "../generated/graphql"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "querystring"
import { MENSAJE_DE_CONFIRMACION } from "../constants/index"
import { TITULO_AVISO_MODAL } from "../constants/index"
import { MENSAJE_DE_CANCELAR_RESERVA } from "../constants/index"
import WrapperButton from "../components/PrimaryButton"
import ModalConfirmWrapper from "../components/ModalConfirm"
import PDF from "../components/DownloadPdf"
import { PDFDownloadLink } from "@react-pdf/renderer"

const ReservationView = ({ reservationId }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [saving, setLoading] = useState(false)
  const history = useHistory()
  const toast = useToast()
  const [, cancelReserve] = useCancelReservationMutation()

  const [{ data, fetching, error }] = useSearchReservationQuery({
    variables: { reservationId },
  })
  const userId = localStorage.getItem("userId") || ""
  const location = useLocation()

  const { "?external": external } = queryString.parse(location.search)
  const onCancel = async () => {
    setLoading(true)
    const res = await cancelReserve({ reservationId, userId })
    setLoading(false)
    if (res.error)
      return toast({
        title: "no se pudo cancelar la reserva",
        description: res.error.message,
        isClosable: true,
        duration: 3000,
        status: "error",
      })
    toast({
      title: "reserva cancelada correctamente",
      description: "",
      isClosable: true,
      duration: 3000,
      status: "success",
    })
    history.push("/")
  }
  const reser =
    data && data.searchReservation.reservation
      ? data?.searchReservation.reservation
      : null
  return external ? (
    <Box>
      {reser ? (
        <Flex flexDir="column" alignItems="center">
          <Heading mt={2} mb={2} as="h3" size="lg">
            Realizada por {reser.citizen.firstName} {reser.citizen.lastName}
          </Heading>

          <Box>
            <Box mt={2} mb={3}>
              <Heading as="h4" size="md">
                Documento:
              </Heading>
              {reser.citizen.document}
              <Heading as="h4" size="md">
                Reunión reservada:
              </Heading>
              {reser.meeting.title}
              <Heading as="h4" size="md">
                Fecha :
              </Heading>
              {reser.meeting.meetingDate}
            </Box>
          </Box>
          <Box mt={3}>
            <WrapperButton>Confirmar asistencia</WrapperButton>
          </Box>
        </Flex>
      ) : null}
      <Loading loading={saving || fetching} />
      {error && <div>{error.message}</div>}
    </Box>
  ) : (
    <Box>
      {reser ? (
        <Flex flexDir="column" alignItems="center">
          <Heading mt={2} mb={2} as="h3" size="lg">
            Bienvenid@ {reser.citizen.firstName} {reser.citizen.lastName}
          </Heading>
          <Box m="auto">
            <img
              src={reser.qrText}
              alt="qr"
              style={{ width: "210px", height: "210px", objectFit: "cover" }}
            />
          </Box>

          <Box>
            <Box mt={2} mb={3}>
              <Heading as="h4" size="md">
                Documento:
              </Heading>
              {reser.citizen.document}
              <Heading as="h4" size="md">
                Reunion reservada:
              </Heading>
              {reser.meeting.title}
              <Heading as="h4" size="md">
                Fecha :
              </Heading>
              {reser.meeting.meetingDate}
            </Box>
            <Text>{MENSAJE_DE_CONFIRMACION}</Text>
          </Box>
          <Box mt={3}>
            <Stack direction="row" spacing={3}>
              <WrapperButton onClick={onOpen}>cancelar</WrapperButton>
              <PDFDownloadLink
                style={{ marginRight: "20px" }}
                document={
                  <PDF
                    firstName={reser.citizen.firstName}
                    lastName={reser.citizen.lastName}
                    qrText={reser.qrText}
                    document={reser.citizen.document}
                    title={reser.meeting.title}
                    meetingDate={reser.meeting.meetingDate}
                    confirmationMessage={MENSAJE_DE_CONFIRMACION}
                  ></PDF>
                }
                fileName={`reservaAforo_${reser.meeting.id}.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <WrapperButton
                    colorScheme="teal"
                    onClick={onOpen}
                    isLoading={loading}
                  >
                    {loading ? "cargando.." : "descargar"}
                  </WrapperButton>
                )}
              </PDFDownloadLink>
            </Stack>
          </Box>
          <ModalConfirmWrapper
            title={TITULO_AVISO_MODAL}
            content={MENSAJE_DE_CANCELAR_RESERVA}
            onClose={onClose}
            isOpen={isOpen}
            action={onCancel}
          ></ModalConfirmWrapper>
        </Flex>
      ) : null}
      <Loading loading={fetching || saving} />
      {error && <div>{error.message}</div>}
    </Box>
  )
}

export default ReservationView
