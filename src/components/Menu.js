import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

const Menu = props => {
  const { isAuth, classes } = props;

  if (!isAuth) {
    return null;
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem to="/" component={Link} button key="Dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem to="/posts" component={Link} button key="Posts">
          <ListItemText primary="Posts" />
        </ListItem>
        <ListItem to="/users" component={Link} button key="Users">
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  loading: state.loading,
});

export default connect(mapStateToProps)(withStyles(styles)(Menu));
