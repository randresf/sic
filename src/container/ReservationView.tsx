import React, { useState } from "react"
import { Box, Flex, useToast, Stack, ModalFooter } from "@chakra-ui/react"
import Loading from "../components/formElements/Loading"
import {
  useSearchReservationQuery,
  useCancelReservationMutation,
} from "../generated/graphql"
import { useHistory } from "react-router-dom"
import { MENSAJE_DE_CONFIRMACION } from "../constants/index"
import { MENSAJE_DE_CANCELAR_RESERVA } from "../constants/index"
import WrapperButton from "../components/formElements/PrimaryButton"
import PDF from "../components/DownloadPdf"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ModalWrapper from "../components/ModalWrapper"
import { RESERVATION_VIEW } from "../ui/formIds"
import CancelReservation from "../components/CancelReservation"
import ExternalReservationView from "./ExternalReservationView"
import UserReservationView from "./UserReservationView"
import { Reservation } from "../generated/graphql"
import CancelButton from "../components/formElements/CancelButton"
import ShouldRender from "../components/ShouldRender"
import moment from "moment"

const ReservationView = ({ reservationId, external = false }: any) => {
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

  // handle edge cases
  if (fetching || saving) return <Loading loading={fetching || saving} />
  if (error) return <div>{error?.message}</div>
  const reservation = data?.searchReservation?.reservation as Reservation
  if (!reservation) return <Box>No hay una reserva con este id</Box>
  // -------

  const onCancel = async () => {
    setLoading(true)
    const { data } = await cancelReserve({ reservationId, userId })
    setLoading(false)
    if (!data?.cancelReservation)
      return toast({
        title: "no se pudo cancelar la reserva",
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

  return external ? (
    <Box>
      <ExternalReservationView reservation={reservation} />
      <Flex mt={3} justifyContent="center">
        <WrapperButton
          id={RESERVATION_VIEW.confirmBtn}
          onClick={onCancel}
          colorScheme="teal"
        >
          confirmar
        </WrapperButton>
      </Flex>
    </Box>
  ) : (
    <Box>
      <UserReservationView reservation={reservation} />
      <Flex mt={3} justifyContent="center">
        <Stack direction="row" align="center" spacing={3}>
          <ShouldRender
            if={
              reservation?.meeting.meetingDate &&
              moment(reservation?.meeting.meetingDate) > moment()
            }
          >
            <CancelButton onClick={() => setOpen(true)}>cancelar</CancelButton>
          </ShouldRender>
          <PDFDownloadLink
            style={{ marginRight: "20px" }}
            document={
              <PDF
                firstName={reservation?.citizen.firstName}
                lastName={reservation?.citizen.lastName}
                qrText={reservation?.qrText}
                document={reservation?.citizen.document}
                title={reservation?.meeting.title}
                meetingDate={reservation?.meeting.meetingDate}
                confirmationMessage={MENSAJE_DE_CONFIRMACION}
              />
            }
            fileName={`reservaAforo_${reservation?.meeting.id}.pdf`}
          >
            {({ loading }) => (
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
      </Flex>
      <ModalWrapper
        titulo=""
        contenido={
          <>
            {MENSAJE_DE_CANCELAR_RESERVA}
            <ModalFooter>
              <CancelReservation
                reservationId={reservationId}
                userId={userId}
                meetingDate={reservation?.meeting.meetingDate}
                onChange={() => history.push("/")}
                labeled
              />
            </ModalFooter>
          </>
        }
        onClose={onClose}
        isOpen={isOpen}
      />
    </Box>
  )
}

export default ReservationView
