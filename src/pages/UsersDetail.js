import React, { Component } from "react";
import { connect } from "react-redux";
import { apiReq } from "../helpers";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { setLoading } from "../actions";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 3
  },
  name: {
    textTransform: "capitalize"
  }
});
class UsersDetail extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    this.props.setLoading(true);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    apiReq
      .get(`/users/${id}`)
      .then(response => {
        const { data } = response;

        if (data) {
          this.setState({ user: data });
        }
      });
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Paper className={classes.root}>
        <Typography
          component="h2"
          variant="h4"
          className={classes.name}
          gutterBottom
        >
          {user.name}
        </Typography>
        <div>{user.email}</div>
      </Paper>
    );
  }
}

export default connect(
  null,
  { setLoading }
)(withStyles(styles)(UsersDetail));
