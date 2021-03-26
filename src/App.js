import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute';
import { axiosWithAuth } from './helpers/axiosWithAuth';
function App() {

  const logout = () => {
    axiosWithAuth()
      .post('api/logout')
      .then(res => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/login" onClick={logout}>logout</a>
        </header>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/bubblepage" component={BubblePage} />
        </Switch>
        {/* <Route path='/bubblepage' component={BubblesPage} /> */}
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.