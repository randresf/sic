import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom"
import { Provider } from "urql"
import Question from "./container/Questions"
import { useClient } from "./hooks/useClient"
import AdminPage from "./pages/Admin"
import { ClientListPage } from "./pages/ClientListPage"
import Confirm from "./pages/Confirm"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/MeetingsPage"
import Login from "./pages/Login"
import ReservationData from "./pages/Reservation"
import Settings from "./pages/Settings"
import UserData from "./pages/UserData"
import createUrqlClient from "./urqlClient"
import ErrorPage from "./pages/ErrorPage"
import ReservationsPage from "./pages/ReservationsPage"

const App = () => {
  return (
    <Provider value={createUrqlClient()}>
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/aforoAdminPage">
            <AdminPage />
          </Route>
          <Route exact path="/">
            <ClientListPage />
          </Route>
          <Route exact path="/:client" component={AppRoutes} />
          <Route exact path="/:client/meetings">
            <Landing />
          </Route>
          <Route path="/:client/reservations">
            <ReservationsPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

const AppRoutes = () => {
  const { client }: { client: string } = useParams<{ client: string }>()
  useClient(client)
  return (
    <Router basename={client}>
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
        <Route exact path="/reservations">
          <ReservationsPage />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
