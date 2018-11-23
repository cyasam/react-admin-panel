import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { verifyAuth } from "../helpers";

import LogoutButton from "./LogoutButton";

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

class Header extends Component {
  setIsAuth = (isAuth) => {
    this.props.setIsAuth(isAuth);
  }

  render(){
    const isAuth = verifyAuth();
    const { classes } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              React Admin Panel
            </Typography>
            {!isAuth ? (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            ) : (
              <LogoutButton color="inherit" setIsAuth={this.setIsAuth}>Logout</LogoutButton>
            )}
          </Toolbar>
          <LinearProgress color="secondary" />
        </AppBar>
      </Fragment>
    );
  }
};

export default withStyles(styles)(Header);
