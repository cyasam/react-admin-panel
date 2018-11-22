import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
  state = {
    loading: false,
    form: {
      username: "",
      password: ""
    }
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
        const { history } = this.props;

        if (success && isAuth) {
          const { token } = response.data;
          localStorage.setItem("app-token", token);
          history.push("/");
        }
      })
      .catch(error => {
        this.setState({ loading: false });
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
              />
            </div>
            <div className="row">
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={this.onInputChange("password")}
                margin="normal"
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

export default Login;
