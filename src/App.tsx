import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Landing from "./pages/Landing"
import DatosPersonales from "./container/formUserData"
import Question from "./container/questions"
import ToggleDarkMode from "./components/ToggleDarkMode"
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react"
import Wrapper from "./components/Wrapper"

import { createClient, Provider } from "urql"

const urqlClient = createClient({
  url: "http://localhost:4000/graphql",
})

const App = () => {
  return (
    <Provider value={urqlClient}>
      <Router>
        <NavBar />
        <hr style={{ marginBottom: "10px", marginTop: "10px" }} />
        <Wrapper variant="regular">
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/datos">
              <DatosPersonales />
            </Route>
            <Route exact path="/preguntas">
              <Question />
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
      <UnorderedList styleType="none">
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
      </UnorderedList>
    </Flex>
  )
}

export default App
