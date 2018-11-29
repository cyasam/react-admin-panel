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

import { setLoading, loadSnackbar } from "../actions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  postTitle: {
    color: theme.palette.text.primary,
    textTransform: "capitalize",
    textDecoration: "none"
  }
});

class Posts extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    this.props.setLoading(true);

    apiReq
      .get("/posts")
      .then(response => {
        const { data } = response;

        if (data) {
          this.setState({ posts: data });
        }
      });
  }

  onDeletePost = (id) => () => {
    apiReq
      .delete(`/posts/${id}`)
      .then(response => {
        const { status } = response;

        if (status === 200) {
          const allPosts = this.state.posts;
          const posts = allPosts.filter(post => post.id !== id);

          this.setState({ posts });

          const { loadSnackbar } = this.props;
          loadSnackbar({
            open: true,
            message: "Post deleted."
          })
        }
      });
  }

  render() {
    const { posts } = this.state;
    const { loading, classes } = this.props;

    if (loading || !posts) {
      return null;
    }

    return (
      <Fragment>
        <Typography component="h2" variant="h4" gutterBottom>
          Posts
        </Typography>
        <Paper className={classes.root}>
          <List>
            {posts.map(post => (
              <ListItem key={post.id}>
                <ListItemText>
                  <Link className={classes.postTitle} to={`/post/${post.id}`}>
                    {post.title}
                  </Link>
                </ListItemText>

                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit">
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton onClick={this.onDeletePost(post.id)} aria-label="Delete">
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
  { setLoading, loadSnackbar }
)(withStyles(styles)(Posts));
