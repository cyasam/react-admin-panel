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
  name: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
});

class Users extends Component {
  state = {
    users: [],
    deleteDialog: {
      item: [],
      open: false,
      title: 'Delete User',
      text: 'Are you sure to delete the user?',
      cancelText: 'Cancel',
      confirmText: 'Delete User',
    },
  };

  componentDidMount() {
    this.props.setLoading(true);

    apiReq.get('/users').then(response => {
      const { data } = response;

      if (data) {
        this.setState({ users: data });
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
    this.onDeleteUser(item);
  };

  onDeleteUser = id => () => {
    apiReq.delete(`/users/${id}`).then(response => {
      const { status } = response;

      if (status === 200) {
        const allUsers = this.state.users;
        const users = allUsers.filter(user => user.id !== id);

        this.setState({ users });

        const { loadSnackbar } = this.props;
        loadSnackbar({
          open: true,
          message: 'User deleted.',
        });
      }
    });
  };

  createEditLink = id => {
    return `/users/edit/${id}`;
  };

  render() {
    const { users, deleteDialog } = this.state;
    const { loading, classes } = this.props;

    if (loading || !users) {
      return null;
    }

    return (
      <Fragment>
        <Typography component="h2" variant="h4" gutterBottom>
          Users
        </Typography>
        <Paper className={classes.root}>
          <List>
            {users.map(user => (
              <ListItem key={user.id}>
                <ListItemText>
                  <Link
                    className={classes.name}
                    to={this.createEditLink(user.id)}
                  >
                    {user.name}
                  </Link>
                </ListItemText>

                <ListItemSecondaryAction>
                  <IconButton
                    component={Link}
                    to={this.createEditLink(user.id)}
                    aria-label="Edit"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={this.clickDeletePost(user)}
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
)(withStyles(styles)(Users));
