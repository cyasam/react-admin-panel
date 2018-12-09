import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiReq } from '../../helpers';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { AlertDialog } from '../../components';

import { setLoading, loadSnackbar } from '../../actions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  postTitle: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
});

class Posts extends Component {
  state = {
    posts: [],
    deleteDialog: {
      item: [],
      open: false,
      title: 'Delete Post',
      text: 'Are you sure to delete the post?',
      cancelText: 'Cancel',
      confirmText: 'Delete Post',
    },
  };
  componentDidMount() {
    this.props.setLoading(true);

    apiReq.get('/posts').then(response => {
      const { data } = response;

      if (data) {
        this.setState({ posts: data });
      }
    });
  }

  clickDeletePost = item => () => {
    this.setState({
      deleteDialog: {
        ...this.state.deleteDialog,
        item,
        open: true,
      },
    });
  };

  onCloseDeletePostDialog = () => {
    this.setState({
      deleteDialog: {
        ...this.state.deleteDialog,
        item: [],
        open: false,
      },
    });
  };

  onConfirmDeletePost = () => {
    const {
      deleteDialog: { item },
    } = this.state;
    this.onDeletePost(item);
  };

  onDeletePost = ({ id, title }) => {
    apiReq
      .delete(`/posts/${id}`)
      .then(response => {
        const { status } = response;

        if (status === 200) {
          const allPosts = this.state.posts;
          const posts = allPosts.filter(post => post.id !== id);

          this.setState({ posts });
          this.onCloseDeletePostDialog();

          const { loadSnackbar } = this.props;
          loadSnackbar({
            open: true,
            message: 'Post deleted.',
          });
        }
      })
      .catch(() => {
        this.onCloseDeletePostDialog();
      });
  };

  createEditLink = id => {
    return `/posts/edit/${id}`;
  };

  render() {
    const { posts, deleteDialog } = this.state;
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
                  <Link
                    className={classes.postTitle}
                    to={this.createEditLink(post.id)}
                  >
                    {post.title}
                  </Link>
                </ListItemText>

                <ListItemSecondaryAction>
                  <IconButton
                    component={Link}
                    to={this.createEditLink(post.id)}
                    aria-label="Edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={this.clickDeletePost(post)}
                    aria-label="Delete"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        <AlertDialog
          open={deleteDialog.open}
          title={deleteDialog.title}
          text={deleteDialog.text}
          cancelText={deleteDialog.cancelText}
          confirmText={deleteDialog.confirmText}
          onCancel={this.onCloseDeletePostDialog}
          onConfirm={this.onConfirmDeletePost}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(
  mapStateToProps,
  { setLoading, loadSnackbar },
)(withStyles(styles)(Posts));
