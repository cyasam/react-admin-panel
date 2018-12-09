import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAuth } from '../actions';
import { removeAuthToken } from '../helpers';

import Button from '@material-ui/core/Button';

class LogoutButton extends Component {
  clickLogout = () => {
    removeAuthToken();

    this.props.setAuth(false);

    const { history } = this.props;
    history.push('/login');
  };
  render() {
    const { children, color } = this.props;
    return (
      <Button color={color} type="button" onClick={this.clickLogout}>
        {children}
      </Button>
    );
  }
}

export default connect(
  null,
  { setAuth },
)(withRouter(LogoutButton));
