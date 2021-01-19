import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Wrapper from "./components/Wrapper"
import Question from "./container/Questions"

import UserData from "./pages/UserData"
import ReservationData from "./pages/Reservation"
import Confirm from "./pages/Confirm"
import Login from "./pages/Login"
import urqlClient from "./urqlClient"
import { Provider } from "urql"
import NavBar from "./components/NavBar"
import Divider from "./components/formElements/Divider"
import Dashboard from "./pages/Dashboard"
import Footer from "./components/Footer"
import Settings from "./pages/Settings"

const App = () => {
  return (
    <Provider value={urqlClient()}>
      <Router>
        <NavBar />
        <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
        <Wrapper>
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
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Wrapper>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
