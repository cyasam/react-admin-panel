import React from "react";
import { Link } from "react-router-dom";
import { verifyAuth } from "../helpers";

import LogoutButton from "./LogoutButton";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Header = props => {
  const isAuth = verifyAuth();
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          {!isAuth ? (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          ) : (
            <LogoutButton color="inherit">Logout</LogoutButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
