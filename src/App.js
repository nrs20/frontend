/*Name: Natalia Smith
Date: 11/30/2023
Course: IT302
Section: 001
Assignment: Unit 11
Email: nrs5@njit.edu
*/
import React, { useState } from 'react'
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import AddRating from "./components/addRating"
import Game from "./components/game"
import Login from "./components/login"
import Logout from "./components/logout"

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import GamesList from './components/gamesList'

function App() {
  const [user, setUser] = useState(null)

  async function login(user = null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Navbar.Brand>Game Ratings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link>
      <Link to={"/nrs5_games"}>Games</Link>
    </Nav.Link>
    <Nav.Link>
      { user ? (
      // <a>Logout User</a>
      <Link to={"/nrs5_logout"}>Logout</Link>

      ) : (
        <Link to={"/nrs5_login"}>Login</Link>
      )}

</Nav.Link>
  </Nav>
</Navbar.Collapse>
</Navbar>
<Switch>

  <Route exact path={["/", "/nrs5_games"]} component={GamesList}>
  </Route>
  <Route path="/nrs5_games/:id/rating" render={(props)=>
    <AddRating {...props} user={user} />
}>
  </Route>
  <Route path="/nrs5_games/:id/" render={(props)=>
    <Game {...props} user={user} />
}>

  </Route>
  <Route path="/nrs5_login" render={(props)=>
    <Login {...props} login={login} />
}>
  
  </Route>
  <Route path="/nrs5_logout" render={(props)=>
    <Logout {...props} logout={logout} />
}>
    </Route>

</Switch>

    </div>
  );
}

export default App;
