import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Landing from "./pages/Landing"
import DatosPersonales from "./container/formUserData"
import ToggleDarkMode from "./components/ToggleDarkMode"
import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react"
import Wrapper from "./components/Wrapper"

function App() {
  return (
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
        </Switch>
      </Wrapper>
    </Router>
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
