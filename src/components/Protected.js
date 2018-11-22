import React, { Component } from "react";
import { verifyAuth, removeAuthToken } from "../helpers";

export default ProtectedComponent => {
  return class Protected extends Component {
    state = {
      Component: null
    };
    componentDidMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (verifyAuth()) {
        this.setState({ Component: ProtectedComponent });
      } else {
        this.setState({ Component: null });
        removeAuthToken();

        const { history } = this.props;
        history.push("/login");
      }
    }

    render() {
      const { Component } = this.state;

      if (!Component) {
        return null;
      }

      return <Component {...this.props} />;
    }
  };
};
