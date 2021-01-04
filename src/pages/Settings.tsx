import { Flex, Heading } from "@chakra-ui/react"
import {useHistory} from "react-router-dom"
import React from "react"
import DisplayText from "../components/formElements/DisplayMessage"
import Wrapper from "../components/Wrapper"
import SettingsData from "../container/SettingsData"
import { CITIZEN_FORM } from "../ui/formIds"
import NeutralButton from "../components/formElements/NeutralButton"

const Settings = () => {
    const history = useHistory();
    return(
        <Wrapper variant="small">
            <Flex alignItems="center" flex={1} p={5} flexDir="column">
                <Heading id={CITIZEN_FORM.headingTitle}>
                    <DisplayText
                        id="app.settings.title"
                        defaultMessage="settings"
                    />
                </Heading>
                <SettingsData>
                    <NeutralButton onClick={ () => {
                        history.push("/dashboard")
                    }}>
                        <DisplayText id="app.buttons.back" defaultMessage="cancel"/>
                    </NeutralButton>
                </SettingsData>
            </Flex>
        </Wrapper>
    )
}

export default Settings