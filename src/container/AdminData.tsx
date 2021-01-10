import React from "react"
import { useIntl } from "react-intl"

const AdminData = ({children, admin}: any) => {
    const {formatMessage} = useIntl()
    const initialValues = admin 
    ? {
        firstName: "",
        lastname: "",
        phone: 0,
        email: "",
        password: "",
        newPassword: "",
        repeatPassword: "",

    } : {

        admin

    }
    return(
        <h1>Hola</h1>
    )
}

export default AdminData