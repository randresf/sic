import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Landing from "./pages/Landing"
import ToggleDarkMode from "./components/ToggleDarkMode"
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react"
import Wrapper from "./components/Wrapper"
import Question from "./container/questions"

import { createClient, Provider } from "urql"
import UserData from "./pages/UserData"
import ReservationData from "./pages/Reservation"
import Confirm from "./pages/Confirm"

const urqlClient = createClient({
  url: process.env.REACT_APP_API || "http://localhost:4000/graphql",
})

const App = () => {
  return (
    <Provider value={urqlClient}>
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
  return (
    <Flex alignItems="center" p={2}>
      <Box>
        <ToggleDarkMode />
      </Box>
      <Box ml={3}>
        <Link to="/"><img src="%PUBLIC_URL%/logo192.png"></img></Link>
      </Box>
    </Flex>
  )
}

export default App
