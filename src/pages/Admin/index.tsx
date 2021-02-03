import React from "react"
import Heading from "../../components/formElements/Heading"
import Subtitle from "../../components/formElements/Subtitle"
import Layout from "../../layouts"
import { AdminForm } from "./AdminForm"

const AdminPage = () => {
  return (
    <Layout>
      <Heading>Organization Creation Page</Heading>
      <Subtitle
        id="organizationPage_Subtitle"
        value="make sure you have the right key ಠ_ಠ"
      />
      <AdminForm />
    </Layout>
  )
}

export default AdminPage
