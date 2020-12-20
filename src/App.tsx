import React from "react"
import { Link } from "react-router-dom"
import LangDropDown from "./LangDropDown"
import ShouldRender from "./ShouldRender"
import { useHeartbeatQuery, useLogoutMutation } from "../generated/graphql"
import WrapperButton from "./formElements/PrimaryButton"
import { NAVABAR_LIST } from "../ui/formIds"
import ToggleDarkMode from "./ToggleDarkMode"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import Wrapper from "./components/Wrapper"
import Question from "./container/questions"

import UserData from "./pages/UserData"
import ReservationData from "./pages/Reservation"
import Confirm from "./pages/Confirm"
import { NAVABAR_LIST } from "./ui/formIds"
import Login from "./pages/Login"
import { useHeartbeatQuery, useLogoutMutation } from "./generated/graphql"
import WrapperButton from "./components/PrimaryButton"
import urqlClient from "./urqlClient"
import { Provider } from "urql"
import LangDropDown from "./components/LangDropDown"
import ShouldRender from "./components/ShouldRender"

const App = () => {
  return (
    <Provider value={urqlClient()}>
      <Router>
        <NavBar />
        <hr style={{ marginBottom: "10px", marginTop: "10px" }} />
        <Wrapper variant="regular">
          <Switch>
            <Route exact path="/datos/:meetingId">
              <UserData />
            </Route>
            <Route exact path="/questions/:userId">
              <Question />
            </Route>
            <Route exact path="/reservation/:reservationId">
              <ReservationData />
            </Route>
            <Route exact path="/confirm/:userId">
              <Confirm />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </Provider>
  )
}

const NavBar = () => {
  const [{ data }] = useHeartbeatQuery()
  const [{ fetching }, logout] = useLogoutMutation()
  return (
    <Box style={{ position: "sticky" }}>
      <Flex alignItems="center" p={2} flexWrap="wrap">
        <Box flexGrow={0}>
          <ToggleDarkMode />
        </Box>
        <Box flexGrow={0} ml={3} w="100px">
          <Link to="/" id={NAVABAR_LIST.logo}>
            <Flex align="center">
              <img style={{ width: "40px" }} src="/logo192.png" alt="logo" />
              <Text ml={2}>Inicio</Text>
            </Flex>
          </Link>
        </Box>
        <Flex flexDir="column" align="initial" flexGrow={1} ml={3}>
          <Heading
            as="h2"
            size="md"
            style={{ color: "#dc6d6d" }}
            id={NAVABAR_LIST.headerTitle}
          >
            CENTRO DE FE Y ESPERANZA DE BELLO
          </Heading>
          <Heading as="h6" size="sm" id={NAVABAR_LIST.subTitle}>
            REGISTRO DE ASISTENCIA A LAS REUNIONES
          </Heading>
        </Flex>

        <ShouldRender if={data && data.heartBeat}>
          <Flex
            flexDir="row"
            justifyContent="flex-end"
            alignItems="center"
            flexGrow={3}
            ml={3}
          >
            <Box left={0}>{data?.heartBeat?.firstName}</Box>
            <WrapperButton
              onClick={async () => {
                await logout()
                //window.location.reload()
              }}
              variant="link"
              isLoading={fetching}
            >
              logout
            </WrapperButton>
          </Flex>
        </ShouldRender>
        <LangDropDown />
      </Flex>
    </Box>
  )
}

export default App
