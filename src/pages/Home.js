import React, { Component } from "react";
import axios from 'axios';

class Home extends Component {
  state = {
    result: ''
  } 
  componentDidMount() {
    axios.get("http://localhost:5000/api").then(res => {
      const { success, result } = res.data;
      if(success){
        this.setState({ result });
      }
    })
  }

  render() {
    const { result } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        <p>{result}</p>
      </div>
    );
  }
}

export default Home;
