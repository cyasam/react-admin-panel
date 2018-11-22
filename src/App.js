import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.scss";

import Header from "./components/Header";

import Protected from "./components/Protected";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Protected(Home)} />
              <Route exact path="/post/:id" component={Protected(PostDetail)} />
              <Route path="/login" component={Login} />
              <Redirect to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
