import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { setAuthToken } from "../helpers";

class Login extends Component {
  state = {
    loading: false,
    form: {
      username: "",
      password: ""
    },
    message: null
  };

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
    this.setState({ loading: true });

    axios
      .post("http://localhost:5000/auth/login", form)
      .then(response => {
        this.setState({ loading: false });

        const { success, isAuth } = response.data;

        if (success && isAuth) {
          const { history, setIsAuth } = this.props;
          const { token, message } = response.data;
          this.setState({ message });

          setTimeout(() => {
            setAuthToken(token);
            setIsAuth(isAuth)
            history.push("/")
          }, 1000);
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

        this.setState({ loading: false });
        throw error;
      });
  };

  render() {
    const { loading, message } = this.state;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={4}>
          <form onSubmit={this.onSubmit} noValidate autoComplete="off">
            <p>{message}</p>
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

export default withRouter(Login);
