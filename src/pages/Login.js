import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authReq } from "../helpers";

import { setAuth, setLoading, loadSnackbar } from "../actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { closeSnackbar } from "../actions";
import { setAuthToken } from "../helpers";

class Login extends Component {
  state = {
    loading: false,
    error: null,
    form: {
      username: "",
      password: ""
    }
  };

  componentDidMount() {
    this.props.setLoading(false);
  }

  onInputChange = name => event => {
    const { value } = event.target;
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [name]: value
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { form } = this.state;
    const { setLoading, closeSnackbar, loadSnackbar } = this.props;

    setLoading(true);
    this.setState({ loading: true });
    closeSnackbar();

    authReq
      .post("/login", form)
      .then(response => {
        this.props.setLoading(false);
        this.setState({ loading: false, error: null });

        const { success, isAuth, message } = response.data;

        let variant;

        if (success && isAuth) {
          const { history, setAuth } = this.props;
          variant = "success";

          const { token } = response.data;
          setAuthToken(token);
          setAuth(isAuth);
          history.push("/");
        } else {
          variant = "error";
        }

        const snackbarProps = {
          open: true,
          message,
          variant
        };

        loadSnackbar(snackbarProps);
      })
      .catch(error => {
        if (error.response) {
          const { message } = error.response.data;

          loadSnackbar({
            open: true,
            variant: "error",
            message: message
          });
        }

        this.props.setLoading(false);
        this.setState({ loading: false, error });
        throw error;
      });
  };

  render() {
    const { loading } = this.state;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={4}>
          <form onSubmit={this.onSubmit} noValidate autoComplete="off">
            <div className="row">
              <TextField
                id="username"
                label="Username"
                onChange={this.onInputChange("username")}
                margin="normal"
                style={{ width: "100%" }}
              />
            </div>
            <div className="row">
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={this.onInputChange("password")}
                margin="normal"
                style={{ width: "100%" }}
              />
            </div>
            <div className="row">
              <Button type="submit" disabled={loading} variant="contained">
                {!loading ? "Login" : "Loading..."}
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  null,
  { setAuth, setLoading, loadSnackbar, closeSnackbar }
)(withRouter(Login));
