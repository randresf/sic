import { ArrowRightIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import { MEETINGS_LIST } from "../ui/formIds"
import { formatDate } from "../utils/formatDate"

type MeetingProps = {
  spots: number
  id: string | number | undefined
  title: string
  meetingDate: string
  admin: boolean
}

const RenderMeetings = ({
  spots,
  id,
  title,
  meetingDate,
  admin,
}: MeetingProps) => {
  return (
    <Flex
      key={id}
      p={3}
      shadow="md"
      borderWidth={1}
      m={2}
      w="270px"
      h="170px"
      flexDir="column"
      className={MEETINGS_LIST.meetingCard}
    >
      <Heading as="h3" size="md" className={MEETINGS_LIST.meetingTitle}>
        {title}
      </Heading>
      <Text as="h3" size="md" className={MEETINGS_LIST.meetingDate}>
        fecha: {formatDate(meetingDate)}
      </Text>
      <Text as="h3" size="md" className={MEETINGS_LIST.spots}>
        cupos: {spots}
      </Text>
      {String(spots) !== "0" && (
        <Flex flexDir="row-reverse">
          <Flex alignItems="center">
            {admin ? (
              <>
                <IconButton mr={2} aria-label="editar" icon={<EditIcon />} />
                <IconButton aria-label="eliminar" icon={<DeleteIcon />} />
              </>
            ) : (
              <Link
                to={`/datos/${id}`}
                className={MEETINGS_LIST.linkCitizenForm}
              >
                <Flex alignItems="center">
                  <Text mr={3}>Reservar</Text>
                  <IconButton
                    className={MEETINGS_LIST.btnReserve}
                    aria-label="reservar"
                    icon={<ArrowRightIcon />}
                  />
                </Flex>
              </Link>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default RenderMeetings
