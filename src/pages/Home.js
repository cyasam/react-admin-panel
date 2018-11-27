import React, { Component } from "react";
import { connect } from "react-redux";

import { setLoading } from "../actions";

class Home extends Component {
  componentDidMount() {
    this.props.setLoading(false);
  }

  render() {
    return (
      <div>
        <p>Dashboard</p>
      </div>
    );
  }
}

export default connect(null, { setLoading })(Home);
