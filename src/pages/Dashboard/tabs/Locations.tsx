import React, { useState } from "react"
import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react"
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
import {
  ACTIVE_MEETING_COLOR,
  INACTIVE_MEETING_COLOR,
} from "../../../constants"
import { useIntl } from "react-intl"
import { v4 } from "uuid"

export default function Locations() {
  const [newPlace, setnewPlace] = useState(false)
  const [deletePlaceModal, setdeletePlaceModal] = useState(false)
  const [placeData, setPlace] = useState({})
  const [{ data, fetching }] = useGetPlacesQuery()
  const [, idPlaceDelete] = useDeletePlaceMutation()
  const { formatMessage } = useIntl()

  const onCloseFormPlace = () => {
    setnewPlace(false)
  }

  const onCloseDeletePlace = () => {
    setdeletePlaceModal(false)
  }

  const deletePlace = async (placeId: any) => {
    if (!placeId) return
    const res = await idPlaceDelete({ placeId: placeId })

    if (res.data?.deletePlace.errors || res.error) {
      setdeletePlaceModal(false)
      return Notify({
        title: formatMessage({ id: "app.notification.cantDeletePlace" }),
        type: "error",
      })
    }
    setdeletePlaceModal(false)
    window.location.reload()
    return Notify({
      title: formatMessage({ id: "app.notification.deletePlaceOk" }),
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
              key={v4()}
              {...place}
              borderColor={
                String(place.isActive) === "false"
                  ? INACTIVE_MEETING_COLOR
                  : ACTIVE_MEETING_COLOR
              }
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
        titulo={
          isEmpty(placeData)
            ? formatMessage({ id: "app.modalLocation.newPlace" })
            : formatMessage({ id: "app.modalLocation.modifyPlace" })
        }
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
        titulo={formatMessage({ id: "app.modalLocation.titleDeletePlace" })}
        contenido={
          <Flex flexDir="column">
            <Center>
              <Text>
                <DisplayText id="app.modalLocation.deletePlace" />
              </Text>
            </Center>
            <Flex alignSelf="flex-end" mt="4" justifyContent="space-between">
              <CancelButton
                onClick={() => {
                  deletePlace(placeData)
                }}
                mr="2"
              >
                <DisplayText id="app.buttons.delete" defaultMessage="delete" />
              </CancelButton>
              <PrimaryButton onClick={onCloseDeletePlace} mr={3}>
                <DisplayText id="app.buttons.back" defaultMessage="back" />
              </PrimaryButton>
            </Flex>
          </Flex>
        }
        isOpen={deletePlaceModal}
        onClose={onCloseDeletePlace}
      />
    </Box>
  )
}
