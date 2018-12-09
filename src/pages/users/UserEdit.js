import React, { Component } from 'react';
import { connect } from 'react-redux';
import { apiReq } from '../../helpers';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { setLoading, loadSnackbar } from '../../actions';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 3,
  },
  textField: {
    width: '30%',
    minWidth: 250,
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});
class UserEdit extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.props.setLoading(true);

    const {
      match: {
        params: { id },
      },
    } = this.props;

    apiReq
      .get(`/users/${id}`)
      .then(response => {
        const { data } = response;

        if (data) {
          this.setState({ user: data });
        }
      })
      .catch(() => {
        const { history } = this.props;
        history.push('/users');
      });
  }

  handleChange = name => event => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: event.target.value,
      },
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { user } = this.state;

    apiReq.put(`/users/${user.id}`, user).then(() => {
      const { loadSnackbar } = this.props;
      loadSnackbar({
        open: true,
        message: 'User updated.',
      });
    });
  };

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    if (!user) {
      return null;
    }

    return (
      <Paper className={classes.root}>
        <form onSubmit={this.onSubmit} noValidate autoComplete="off">
          <FormGroup row={true}>
            <TextField
              label="Name"
              className={classes.textField}
              value={user.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              label="Username"
              className={classes.textField}
              value={user.username}
              onChange={this.handleChange('username')}
              margin="normal"
            />
            <TextField
              label="Email"
              className={classes.textField}
              value={user.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <TextField
              label="Phone"
              className={classes.textField}
              value={user.phone}
              onChange={this.handleChange('phone')}
              margin="normal"
            />
          </FormGroup>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
        </form>
      </Paper>
    );
  }
}

export default connect(
  null,
  { setLoading, loadSnackbar },
)(withStyles(styles)(UserEdit));
