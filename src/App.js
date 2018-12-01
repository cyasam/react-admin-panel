import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import SnackBar from "./components/SnackBar";

import { Provider } from "react-redux";
import store from "./store";

import Header from "./components/Header";
import Menu from "./components/Menu";

import Protected from "./components/Protected";
import { Home, Posts, PostEdit, Login, Users, UserEdit } from "./Routes";

import "./App.scss";


const style = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Router>
        <Provider store={store}>
          <div className={classes.root}>
            <Header />
            <Menu />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path="/" component={Protected(Home)} />
                <Route path="/posts" component={Protected(Posts)} />
                <Route path="/post/:id" component={Protected(PostEdit)} />
                <Route path="/users" component={Protected(Users)} />
                <Route path="/user/:id" component={Protected(UserEdit)} />
                <Route path="/login" component={Login} />
                <Redirect to="/" />
              </Switch>
            </main>
            <SnackBar />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default withStyles(style)(App);
