import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);
  const [ meal, setMeal ] = useState([])
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [setMeal]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route path="/">
              <Home user={user} setUser={setUser} setMeal={setMeal} meal={meal}/>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup">
              <SignUp setUser={setUser}/>
            </Route>
            <Route path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route path="/">
              <Home user={user} setUser={setUser} setMeal={setMeal} meal={meal}/>
            </Route>
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
