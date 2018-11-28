import React, { Component } from "react";
import { checkToken, removeAuthToken } from "../helpers";
import { connect } from "react-redux";
import { setErrorStateToStore } from "../helpers";

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

        let error = {};
        if(isAuth && !checkToken()){
          error = {
            open: true,
            message: "Your authentication is expired. Please login again."
          }
        }
        setErrorStateToStore(error);

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
