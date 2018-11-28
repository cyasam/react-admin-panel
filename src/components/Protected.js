import React, { Component } from "react";
import { removeAuthToken } from "../helpers";
import { connect } from "react-redux";

export default ProtectedComponent => {
  class Protected extends Component {
    componentDidMount() {
      this.checkAuth();
    }
    
    componentDidUpdate() {
        this.checkAuth();
    }

    checkAuth() {
      const { isAuth } = this.props;

      if (!isAuth) {
        removeAuthToken();

        const { history } = this.props;
        history.push("/login");
      }
    }

    render() {
      const { isAuth } = this.props;

      if (!isAuth) {
        return null;
      }

      return <ProtectedComponent {...this.props} />;
    }
  };

  const mapStateToProps = state => ({
    isAuth: state.isAuth
  });

  return connect(mapStateToProps)(Protected);
};
