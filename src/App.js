import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import store from './store';

import { Home, PostsIndex, Login, UsersIndex } from './Routes';
import { Header, Menu, Protected, SnackBar } from './components';

import './App.scss';

const style = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
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
                <Route path="/posts" component={Protected(PostsIndex)} />
                <Route path="/users" component={Protected(UsersIndex)} />
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
