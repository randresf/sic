import { Box, Flex } from "@chakra-ui/react"
import React, { useState } from "react"
import AddCard from "../../../components/AddCard"
import ModalWrapper from "../../../components/ModalWrapper"
import isEmpty from "../../../utils/isEmpty"
import { useIntl } from "react-intl"
import AdminData from "../../../container/AdminData"
import NeutralButton from "../../../components/formElements/NeutralButton"
import DisplayText from "../../../components/formElements/DisplayMessage"
import { useGetAdminDataQuery } from "../../../generated/graphql"
import Loading from "../../../components/formElements/Loading"

const Admins = ({ adminId }: any) => {
  const { formatMessage } = useIntl()
  const [, setPlace] = useState({})
  const [newAdmin, setnewAdmin] = useState(false)

  const [{ data, fetching }] = useGetAdminDataQuery()

  const onCloseFormAdmin = () => {
    setnewAdmin(false)
  }

  return (
    <Loading loading={fetching}>
      <Flex flex={1} justifyContent="center" flexWrap="wrap">
        <AddCard
          onClick={() => {
            setPlace({})
            setnewAdmin(true)
          }}
        />
      </Flex>
      <ModalWrapper
        titulo={
          isEmpty(adminId)
            ? formatMessage({ id: "app.modalAdmin.modifyAdmin" })
            : formatMessage({ id: "app.modalAdmin.newAdmin" })
        }
        contenido={
          <AdminData adminId={adminId}>
            <NeutralButton onClick={onCloseFormAdmin} mr={3}>
              <DisplayText id="app.buttons.back" defaultMessage="back" />
            </NeutralButton>
          </AdminData>
        }
        isOpen={newAdmin}
        onClose={onCloseFormAdmin}
      />
    </Loading>
  )
}

export default Admins
