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
import ShouldRender from "../../../components/ShouldRender"
import AdminCard from "../../../container/AdminCard"
import { v4 } from "uuid"
import DefaultContainer from "../../../components/DefaultContainer"

const Admins = ({ adminId }: any) => {
  const { formatMessage } = useIntl()
  const [, setPlace] = useState({})
  const [newAdmin, setnewAdmin] = useState(false)

  const [{ data, fetching }] = useGetAdminDataQuery()

  const onCloseFormAdmin = () => {
    setnewAdmin(false)
  }

  return (
    <>
      <DefaultContainer>
        <Loading loading={fetching}>
          <ShouldRender if={data && data?.getAdminsData.length < 2}>
            <AddCard
              onClick={() => {
                setPlace({})
                setnewAdmin(true)
              }}
            />
          </ShouldRender>
        </Loading>
        <ShouldRender if={data && data.getAdminsData}>
          {data?.getAdminsData.map(
            ({
              id,
              firstName,
              lastName,
              phone,
              email,
              children,
              username,
            }: any) => (
              <AdminCard
                key={v4()}
                id={id}
                firstName={firstName}
                lastName={lastName}
                phone={phone}
                email={email}
                children={children}
                username={username}
              ></AdminCard>
            )
          )}
        </ShouldRender>
      </DefaultContainer>
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
    </>
  )
}

export default Admins
