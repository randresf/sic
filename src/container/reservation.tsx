import React, { useState } from "react"
import {
  Box,
  Flex,
  Text,
  Heading,
  useToast,
  Stack,
  Center,
  ModalFooter,
} from "@chakra-ui/react"
import Loading from "../components/Loading"
import {
  useSearchReservationQuery,
  useCancelReservationMutation,
} from "../generated/graphql"
import { useLocation, useHistory } from "react-router-dom"
import queryString from "querystring"
import { MENSAJE_DE_CONFIRMACION } from "../constants/index"
import { MENSAJE_DE_CANCELAR_RESERVA } from "../constants/index"
import WrapperButton from "../components/PrimaryButton"
import PDF from "../components/DownloadPdf"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ModalWrapper from "../components/ModalWrapper"
import { formatDate } from "../utils/formatDate"
import moment from "moment"
import { RESERVATION_VIEW } from "../ui/formIds"

const ReservationView = ({ reservationId }: any) => {
  const [saving, setLoading] = useState(false)
  const history = useHistory()
  const toast = useToast()
  const [, cancelReserve] = useCancelReservationMutation()

  const [isOpen, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }

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
        <Flex flexDir="column" alignItems="center" flexWrap="wrap">
          <Heading id={RESERVATION_VIEW.title} mt={2} mb={2} as="h3" size="lg">
            Reserva realizada por {reser.citizen.firstName}{" "}
            {reser.citizen.lastName}
          </Heading>

          <Box>
            <Box mt={2} mb={3}>
              <Heading id={RESERVATION_VIEW.document} as="h4" size="md">
                Documento:
              </Heading>
              {reser.citizen.document}
              <Heading id={RESERVATION_VIEW.meetigTitle} as="h4" size="md">
                Reunión reservada:
              </Heading>
              {reser.meeting.title}
              <Heading id={RESERVATION_VIEW.meetingDate} as="h4" size="md">
                Fecha :
              </Heading>
              {formatDate(reser.meeting.meetingDate)}
            </Box>
          </Box>
          <Box mt={3}>
            <WrapperButton
              id={RESERVATION_VIEW.confirmBtn}
              onClick={onCancel}
              colorScheme="teal"
            >
              confirmar
            </WrapperButton>
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
          <Heading
            id={RESERVATION_VIEW.welcome}
            mt={2}
            mb={3}
            as="h3"
            size="lg"
          >
            Bienvenid@ {reser.citizen.firstName} {reser.citizen.lastName}
          </Heading>
          <Box m="auto">
            <img
              id={RESERVATION_VIEW.qrCode}
              src={reser.qrText}
              alt="qr"
              style={{ width: "210px", height: "210px", objectFit: "cover" }}
            />
          </Box>

          <Box mt={3} mb={3}>
            <Flex flexDir="column" mt={2} mb={3}>
              <Flex mb={2} flexDir="row">
                <Center>
                  <Heading
                    id={RESERVATION_VIEW.reservationTitleDocument}
                    as="h4"
                    size="md"
                  >
                    Documento:
                  </Heading>
                  <Text
                    id={RESERVATION_VIEW.userDocument}
                    fontSize="md"
                    ml={15}
                  >
                    {reser.citizen.document}
                  </Text>
                </Center>
              </Flex>
              <Flex mb={2} flexDir="row">
                <Center>
                  <Heading
                    id={RESERVATION_VIEW.reservationTitlemeeting}
                    as="h4"
                    size="md"
                  >
                    Reunion reservada:
                  </Heading>
                  <Text id={RESERVATION_VIEW.userMeeting} fontSize="md" ml={15}>
                    {reser.meeting.title}
                  </Text>
                </Center>
              </Flex>
              <Flex mb={2} flexDir="row">
                <Center>
                  <Heading
                    id={RESERVATION_VIEW.reservationTitleDate}
                    as="h4"
                    size="md"
                  >
                    Fecha :
                  </Heading>
                  <Text
                    id={RESERVATION_VIEW.reservationUserDate}
                    fontSize="md"
                    ml={15}
                  >
                    {formatDate(reser.meeting.meetingDate)}
                  </Text>
                </Center>
              </Flex>
            </Flex>
            <Text id={RESERVATION_VIEW.msgConfirm}>
              {MENSAJE_DE_CONFIRMACION}
            </Text>
          </Box>
          <Box mt={3}>
            <Stack direction="row" spacing={3}>
              {moment(reser.meeting.meetingDate).utc() >= moment().utc() && (
                <WrapperButton
                  id={RESERVATION_VIEW.btnOpenModalCancelReserve}
                  onClick={() => setOpen(true)}
                >
                  cancelar
                </WrapperButton>
              )}
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
                    id={RESERVATION_VIEW.btnDownLoadPdf}
                    colorScheme="teal"
                    isLoading={loading}
                  >
                    {loading ? "cargando.." : "descargar"}
                  </WrapperButton>
                )}
              </PDFDownloadLink>
            </Stack>
          </Box>
          <ModalWrapper
            titulo=""
            contenido={
              <>
                {MENSAJE_DE_CANCELAR_RESERVA}
                <ModalFooter>
                  <WrapperButton
                    id={RESERVATION_VIEW.btnCancelReserve}
                    fontSize={14}
                    onClick={onCancel}
                    colorScheme="teal"
                  >
                    cancelar
                  </WrapperButton>
                </ModalFooter>
              </>
            }
            onClose={onClose}
            isOpen={isOpen}
          ></ModalWrapper>
        </Flex>
      ) : null}
      <Loading loading={fetching || saving} />
      {error && <div>{error.message}</div>}
    </Box>
  )
}

export default ReservationView
