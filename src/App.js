/* Libraries Imported */
import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./MainPages/Menu";
import Login from "./User/SignIn";
import SignUp from "./NewUser/SignUp";
import { AuthProvider } from "./HelpFiles/Auth";
import PrivateRoute from "./HelpFiles/PrivateRoute";
import ForgotPassword from "./User/ForgotPassword";
import Profilee from './MainPages/Profilee';
import Info from './NewUser/Info';

class App extends Component {
  render() {
  return (
    <div className="table">
      {/* Main rounting for new or exist user*/}
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Menu}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/forgotpassword" component={ForgotPassword}/>
          <Route exact path="/profile" component={Profilee}/>
          <Route exact path="/info" component={Info}/>
        </Router>
      </AuthProvider>
    </div>
    );
  }
}
export default App;
