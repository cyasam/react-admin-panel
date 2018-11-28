import React, { Component } from "react";
import { checkToken, removeAuthToken } from "../helpers";
import { connect } from "react-redux";
import { setErrorStatesToStore } from "../helpers";

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

      if (!isAuth || !checkToken()) {
        removeAuthToken();

        const error = {
          open: (!isAuth || !checkToken()),
          message: "Your authentication is expired. Please login again."
        }
        setErrorStatesToStore(error);

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

  return connect(mapStateToProps, {  })(Protected);
};
