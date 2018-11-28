import React, { Component } from "react";
import { connect } from "react-redux";
import { apiReq } from "../helpers";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { setLoading } from "../actions";
import { getAuthToken } from "../helpers";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 3
  },
  postTitle: {
    textTransform: "capitalize"
  }
});
class PostDetail extends Component {
  state = {
    post: null
  };

  componentDidMount() {
    this.props.setLoading(true);

    const token = getAuthToken();
    const {
      match: {
        params: { id }
      }
    } = this.props;

    apiReq
      .get(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setLoading(false);

        const { data } = response;

        if (data) {
          this.setState({ post: data });
        }
      })
      .catch(error => {
        this.props.setLoading(false);
        throw error;
      });
  }

  render() {
    const { post } = this.state;
    const { classes } = this.props;

    if (!post) {
      return null;
    }

    return (
      <Paper className={classes.root}>
        <Typography
          component="h2"
          variant="h4"
          className={classes.postTitle}
          gutterBottom
        >
          {post.title}
        </Typography>
        <div>{post.body}</div>
      </Paper>
    );
  }
}

export default connect(
  null,
  { setLoading }
)(withStyles(styles)(PostDetail));
