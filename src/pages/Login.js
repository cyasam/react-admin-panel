import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  onInputChange = name => event => {
    const { value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { username, password } = this.state;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={4}>
          <form onSubmit={this.onSubmit} noValidate autoComplete="off">
            <div className="row">
              <TextField
                id="username"
                label="Username"
                value={username}
                onChange={this.onInputChange("username")}
                margin="normal"
              />
            </div>
            <div className="row">
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={this.onInputChange("password")}
                margin="normal"
              />
            </div>
            <div className="row">
              <Button type="submit" variant="contained">
                Login
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
