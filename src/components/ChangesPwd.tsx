import { Link, useStyleConfig } from "@chakra-ui/react"
import React from "react"
import DisplayText from "./formElements/DisplayMessage"
import FormikInput from "./formElements/FormikInput"
import ShouldRender from "./ShouldRender"
import { useIntl } from "react-intl"

const ChangePwd = ({ onChangenewPwd, newPwd }: any) => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Link
        mt={4}
        onClick={() => {
          onChangenewPwd(!newPwd)
        }}
        href="#"
        sx={useStyleConfig("Link", {})}
      >
        {newPwd ? (
          <DisplayText id="app.label.hide" defaultMessage="hide" />
        ) : (
          <DisplayText
            id="app.buttons.changePwd"
            defaultMessage="change password"
          />
        )}
      </Link>
      <ShouldRender if={newPwd}>
        <FormikInput
          id="5"
          type="password"
          label={formatMessage({ id: "form.pwd" })}
          name="password"
          disabled={false}
          required={newPwd}
        />
        <FormikInput
          id="6"
          type="password"
          label={formatMessage({ id: "form.Newpwd" })}
          name="newPassword"
          disabled={false}
          required={newPwd}
        />
        <FormikInput
          id="7"
          type="password"
          label={formatMessage({ id: "form.Repeatpwd" })}
          name="repeatPassword"
          disabled={false}
          required={newPwd}
        />
      </ShouldRender>
    </>
  )
}

export default ChangePwd
