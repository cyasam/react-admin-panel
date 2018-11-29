import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LogoutButton from "./LogoutButton";
import AppLoading from "./AppLoading"

import { withStyles } from '@material-ui/core/styles';
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

const Header = (props) => {
  const { isAuth, classes, loading } = props; 

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
            <LogoutButton color="inherit">Logout</LogoutButton>
          )}
        </Toolbar>
        { loading && <AppLoading loading={loading} /> }
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state =>  ({
  isAuth: state.isAuth,
  loading: state.loading
})

export default connect(mapStateToProps)(withStyles(styles)(Header));
