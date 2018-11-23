import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import "./App.scss";

import Header from "./components/Header";
import Menu from "./components/Menu";

import Protected from "./components/Protected";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import { verifyAuth } from "./helpers";

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
  state = {
    isAuth: false
  }

  componentDidMount(){
    if(verifyAuth()){
      this.setIsAuth(true);
    }
  }

  getMenu = () => {
    const { isAuth } = this.state;
    if(isAuth) {
      return <Menu />;
    }

    return null;
  }

  setIsAuth = (isAuth) => {
    this.setState({ isAuth });
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <Header setIsAuth={this.setIsAuth} />
          { this.getMenu() }
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={Protected(Home)} />
              <Route exact path="/posts" component={Protected(Posts)} />
              <Route exact path="/post/:id" component={Protected(PostDetail)} />
              <Route path="/login" render={() => <Login setIsAuth={this.setIsAuth} />} />
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(style)(App);
