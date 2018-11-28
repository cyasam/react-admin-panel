import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { apiReq } from "../helpers";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { setLoading } from "../actions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  name: {
    color: theme.palette.text.primary,
    textTransform: "capitalize",
    textDecoration: "none"
  }
});

class Users extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.props.setLoading(true);

    apiReq
      .get("/users")
      .then(response => {
        const { data } = response;

        if (data) {
          this.setState({ users: data });
        }
      });
  }

  render() {
    const { users } = this.state;
    const { loading, classes } = this.props;

    if (loading || !users) {
      return null;
    }

    return (
      <Fragment>
        <Typography component="h2" variant="h3" gutterBottom>
          Users
        </Typography>
        <Paper className={classes.root}>
          <List>
            {users.map(user => (
              <ListItem key={user.id}>
                <ListItemText>
                  <Link className={classes.name} to={`/user/${user.id}`}>
                    {user.name}
                  </Link>
                </ListItemText>

                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit">
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton aria-label="Delete">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(
  mapStateToProps,
  { setLoading }
)(withStyles(styles)(Users));
