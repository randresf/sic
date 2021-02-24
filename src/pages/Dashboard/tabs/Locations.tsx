import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { useIntl } from "react-intl"
import { v4 } from "uuid"
import AddCard from "../../../components/AddCard"
import DefaultContainer from "../../../components/DefaultContainer"
import CancelButton from "../../../components/formElements/CancelButton"
import DisplayText from "../../../components/formElements/DisplayMessage"
import IconButton from "../../../components/formElements/IconButton"
import Loading from "../../../components/formElements/Loading"
import NeutralButton from "../../../components/formElements/NeutralButton"
import PrimaryButton from "../../../components/formElements/PrimaryButton"
import ModalWrapper from "../../../components/ModalWrapper"
import ShouldRender from "../../../components/ShouldRender"
import { ACTIVE_CARD_COLOR, INACTIVE_CARD_COLOR } from "../../../constants"
import PlaceCard from "../../../container/PlaceCard"
import PlaceData from "../../../container/PlaceData"
import {
  useDeletePlaceMutation,
  useGetPlacesQuery,
} from "../../../generated/graphql"
import isEmpty from "../../../utils/isEmpty"
import Notify from "../../../utils/notify"

export default function Locations() {
  const [newPlace, setnewPlace] = useState(false)
  const [deletePlaceModal, setDeletePlaceModal] = useState(false)
  const [placeData, setPlace] = useState({})
  const [{ data, fetching }, fetchAgain] = useGetPlacesQuery()
  const [, idPlaceDelete] = useDeletePlaceMutation()
  const { formatMessage } = useIntl()

  const onCloseFormPlace = () => {
    setnewPlace(false)
  }

  const onCloseDeletePlace = (addedNew: boolean | undefined) => {
    setDeletePlaceModal(false)
    if (addedNew) fetchAgain()
  }

  const deletePlace = async (placeId: any) => {
    if (!placeId) return
    const res = await idPlaceDelete({ placeId: placeId })

    if (res.data?.deletePlace.errors || res.error) {
      setDeletePlaceModal(false)
      return Notify({
        title: formatMessage({ id: "app.notification.cantDeletePlace" }),
        type: "error",
      })
    }
    setDeletePlaceModal(false)
    return Notify({
      title: formatMessage({ id: "app.notification.deletePlaceOk" }),
      type: "success",
    })
  }

  return (
    <>
      <DefaultContainer>
        <Loading loading={fetching}>
          <AddCard
            onClick={() => {
              setPlace({})
              setnewPlace(true)
            }}
          />
        </Loading>
        <ShouldRender if={data && data.getUserPlaces}>
          {data?.getUserPlaces.place?.map(({ __typename, ...place }: any) => (
            <PlaceCard
              key={v4()}
              {...place}
              bg={
                String(place.isActive) === "true"
                  ? ACTIVE_CARD_COLOR
                  : INACTIVE_CARD_COLOR
              }
            >
              <IconButton
                onClick={() => {
                  setDeletePlaceModal(true)
                  setPlace(place.id)
                }}
                aria-label="eliminar"
                iconType="IconDelete"
                mr={2}
                icon={<DeleteIcon />}
              />
              <IconButton
                onClick={() => {
                  setPlace(place)
                  setnewPlace(true)
                }}
                iconType="IconEdit"
                aria-label="editar"
                icon={<EditIcon />}
              />
            </PlaceCard>
          ))}
        </ShouldRender>
      </DefaultContainer>
      <ModalWrapper
        titulo={
          isEmpty(placeData)
            ? formatMessage({ id: "app.modalLocation.newPlace" })
            : formatMessage({ id: "app.modalLocation.modifyPlace" })
        }
        contenido={
          <PlaceData place={placeData} onDone={onCloseFormPlace}>
            <NeutralButton onClick={onCloseFormPlace} mr={3}>
              <DisplayText id="app.buttons.back" defaultMessage="back" />
            </NeutralButton>
          </PlaceData>
        }
        isOpen={newPlace}
        onClose={onCloseFormPlace}
      />
      <ModalWrapper
        titulo={formatMessage({ id: "app.modalLocation.titleDeletePlace" })}
        contenido={
          <Text>
            <DisplayText id="app.modalLocation.deletePlace" />
          </Text>
        }
        actions={
          <>
            <CancelButton
              onClick={() => {
                deletePlace(placeData)
              }}
            >
              <DisplayText id="app.buttons.delete" defaultMessage="delete" />
            </CancelButton>
            <PrimaryButton onClick={onCloseDeletePlace}>
              <DisplayText id="app.buttons.back" defaultMessage="back" />
            </PrimaryButton>
          </>
        }
        isOpen={deletePlaceModal}
        onClose={onCloseDeletePlace}
      />
    </>
  )
}
