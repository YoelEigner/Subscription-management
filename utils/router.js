import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../main/Login";
import SignUp from "../main/SignUp";
import {  AuthProvider } from "../utils/Auth";
import MovieInfo from "./../main/movies/MovieInfo";
import MoviesHome from "./../main/movies/Movies";
import Subscribers from "./../main/subscription/Subscribers";
import UserMngmt from "./../main/UserManagement";
import { AccessDenied } from "./../main/AccessDenied";

function Routing() {
  const timeOut = 1;
  const sessionTimeout = () => {
    console.log(timeOut);
  };
  return (
    <div>
      <AuthProvider>
        <Router>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/movies" component={MovieInfo} />
          <Route path="/members/:memberId?" component={Subscribers} />
          <Route path="/movieshome/:movie?" component={MoviesHome} onEnter={() => sessionTimeout()} />
          <Route path="/usermanage/" component={UserMngmt} />
          <Route path="/accessdenied/" component={AccessDenied} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default Routing;
