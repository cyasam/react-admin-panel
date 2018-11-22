import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  state = {
    loading: false,
    posts: []
  };
  componentDidMount() {
    this.setState({ loading: true });
    
    const token = localStorage.getItem("app-token");

    axios
      .get("http://localhost:5000/api/posts", { headers: { "Authorization": `Bearer ${token}` }})
      .then(response => {
        this.setState({ loading: false });

        const { data } = response;

        if (data) {
          this.setState({ posts: data });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        throw error;
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div>
        <h1>Home Page</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
