import React, { useState } from "react"
import { Box, Flex, Stack, Text } from "@chakra-ui/react"
import ModalWrapper from "../../../components/ModalWrapper"
import AddCard from "../../../components/AddCard"
import isEmpty from "../../../utils/isEmpty"
import NeutralButton from "../../../components/formElements/NeutralButton"
import DisplayText from "../../../components/formElements/DisplayMessage"
import Loading from "../../../components/formElements/Loading"
import PlaceData from "../../../container/PlaceData"
import {
  useGetPlacesQuery,
  useDeletePlaceMutation,
} from "../../../generated/graphql"
import ShouldRender from "../../../components/ShouldRender"
import IconButton from "../../../components/formElements/IconButton"
import PlaceCard from "../../../container/PlaceCard"
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import CancelButton from "../../../components/formElements/CancelButton"
import PrimaryButton from "../../../components/formElements/PrimaryButton"
import Notify from "../../../utils/notify"

export default function Locations() {
  const [newPlace, setnewPlace] = useState(false)
  const [deletePlaceModal, setdeletePlaceModal] = useState(false)
  const [placeData, setPlace] = useState({})
  const [{ data, fetching }] = useGetPlacesQuery()
  const [, idPlaceDelete] = useDeletePlaceMutation()

  const onCloseFormPlace = () => {
    setnewPlace(false)
  }

  const onCloseDeleteMeeting = () => {
    setdeletePlaceModal(false)
  }

  const deletePlace = async (placeId: any) => {
    if (!placeId) return
    const res = await idPlaceDelete({ placeId: placeId })
    if (res.data?.deletePlace.errors) {
      setdeletePlaceModal(false)
      return Notify({
        title: "No se puede eliminar la reunión",
        type: "error",
      })
    }
    setdeletePlaceModal(false)
    window.location.reload()
    return Notify({
      title: "reunión eliminada correctamente",
      type: "success",
    })
  }

  if (fetching) return <Loading loading={fetching} />
  return (
    <Box>
      <Flex flex={1} alignItems="center" flexWrap="wrap">
        <AddCard
          onClick={() => {
            setPlace({})
            setnewPlace(true)
          }}
        />
        <ShouldRender if={data && data.getUserPlaces}>
          {data?.getUserPlaces.place?.map(({ __typename, ...place }: any) => (
            <PlaceCard
              {...place}
              borderColor={place.isActive === "false" ? "tomato" : "#269e39"}
            >
              <IconButton
                onClick={() => {
                  setPlace(place)
                  setnewPlace(true)
                }}
                mr={2}
                aria-label="editar"
                icon={<EditIcon />}
              />
              <IconButton
                onClick={() => {
                  setdeletePlaceModal(true)
                  setPlace(place.id)
                }}
                aria-label="eliminar"
                icon={<DeleteIcon />}
              />
            </PlaceCard>
          ))}
        </ShouldRender>
      </Flex>
      <ModalWrapper
        titulo={isEmpty(placeData) ? "Nuevo Lugar" : "Modificar Lugar"}
        contenido={
          <PlaceData place={placeData}>
            <NeutralButton onClick={onCloseFormPlace} mr={3}>
              <DisplayText id="app.buttons.back" defaultMessage="back" />
            </NeutralButton>
          </PlaceData>
        }
        isOpen={newPlace}
        onClose={onCloseFormPlace}
      />
      <ModalWrapper
        titulo="Eliminar lugar"
        contenido={
          <>
            <Text>Esta seguro que desea eliminar este lugar?</Text>
            <Stack spacing={3}>
              <CancelButton
                onClick={() => {
                  deletePlace(placeData)
                }}
              >
                <DisplayText id="app.buttons.delete" defaultMessage="delete" />
              </CancelButton>
              <PrimaryButton onClick={onCloseDeleteMeeting} mr={3}>
                <DisplayText id="app.buttons.back" defaultMessage="back" />
              </PrimaryButton>
            </Stack>
          </>
        }
        isOpen={deletePlaceModal}
        onClose={onCloseDeleteMeeting}
      />
    </Box>
  )
}
