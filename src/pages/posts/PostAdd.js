import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { apiReq } from '../../helpers';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { PageHeader } from '../../components';

import { setLoading, loadSnackbar } from '../../actions';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 3,
  },
  textField: {
    width: '100%',
    minWidth: 250,
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});

class PostAdd extends Component {
  state = {
    post: {
      title: '',
      body: '',
    },
  };

  componentDidMount() {
    this.props.setLoading(false);
  }

  handleChange = name => event => {
    this.setState({
      post: {
        ...this.state.post,
        [name]: event.target.value,
      },
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { post } = this.state;

    apiReq.post('/posts', post).then(() => {
      const { loadSnackbar } = this.props;
      loadSnackbar({
        open: true,
        message: 'Post added.',
      });

      const { history } = this.props;
      history.push('/posts');
    });
  };

  render() {
    const { post } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <PageHeader>
          <Typography component="h2" variant="h4">
            New Post
          </Typography>
        </PageHeader>
        <Paper className={classes.root}>
          <form onSubmit={this.onSubmit} noValidate autoComplete="off">
            <FormGroup row={true}>
              <TextField
                label="Name"
                className={classes.textField}
                value={post.title}
                onChange={this.handleChange('title')}
              />
              <TextField
                label="Body"
                className={classes.textField}
                value={post.body}
                multiline={true}
                rowsMax={20}
                onChange={this.handleChange('body')}
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
      </Fragment>
    );
  }
}

export default connect(
  null,
  { setLoading, loadSnackbar },
)(withStyles(styles)(PostAdd));
