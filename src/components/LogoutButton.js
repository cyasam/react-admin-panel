import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { removeAuthToken } from "../helpers";

import Button from '@material-ui/core/Button';

class LogoutButton extends Component {
  clickLogout = () => {
    removeAuthToken();

    const { history } = this.props;
    history.push("/login");
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

export default withRouter(LogoutButton);
