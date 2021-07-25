import React from "react";

import "./App.css";
import HomePage from "./Components/HomePage";
import { Switch, Route } from "react-router-dom";
import Selector from "./Components/Selector";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Team from "./Components/team";
import Login from "./Components/Login";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <>
          <div className="appbody">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <HomePage {...props} />}
              />
              <Route
                path="/favorites"
                render={(props) => <Team {...props} />}
              />

              <Route
                path="/:pokemonId"
                render={(props) => <Selector {...props} />}
              />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
