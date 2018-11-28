import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authReq } from "../helpers";

import { setAuth, setLoading } from "../actions";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { setAuthToken } from "../helpers";
import SnackBar from "../components/SnackBar";

class Login extends Component {
  state = {
    loading: false,
    error: null,
    message: null,
    openSnackBar: false,
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

    this.props.setLoading(true);
    this.setState({ loading: true, openSnackBar: false });

    authReq
      .post("/login", form)
      .then(response => {
        this.props.setLoading(false);
        this.setState({ loading: false, error: null, openSnackBar: true });

        const { success, isAuth } = response.data;

        if (success && isAuth) {
          const { history, setAuth } = this.props;
          const { token, message } = response.data;
          this.setState({ message });

          setTimeout(() => {
            setAuthToken(token);
            setAuth(isAuth);
            history.push("/");
          }, 2000);
        } else {
          const { message } = response.data;
          this.setState({ message });
        }
      })
      .catch(error => {
        if (error.response) {
          const { message } = error.response.data;
          this.setState({ message });
        }

        this.props.setLoading(false);
        this.setState({ loading: false, error, openSnackBar: true });
        throw error;
      });
  };

  closeSnackBar = () => {
    this.setState({
      openSnackBar: false
    });
  };

  renderSnackBar = () => {
    const { error, message, openSnackBar } = this.state;

    const variant = !error ? "success" : "error";

    return (
      <SnackBar
        open={openSnackBar}
        closeSnackBar={this.closeSnackBar}
        variant={variant}
        autoHideDuration={5000}
      >
        {message}
      </SnackBar>
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={4}>
          {this.renderSnackBar()}
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
  { setAuth, setLoading }
)(withRouter(Login));
