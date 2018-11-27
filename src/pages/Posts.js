import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setLoading } from "../actions";
import { getAuthToken } from '../helpers';

class Posts extends Component {
  state = {
    loading: true,
    posts: []
  };
  componentDidMount() {
    this.props.setLoading(true);
    this.setState({ loading: true });

    const token = getAuthToken();

    axios
      .get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setLoading(false);
        this.setState({ loading: false });

        const { data } = response;

        if (data) {
          this.setState({ posts: data });
        }
      })
      .catch(error => {
        this.props.setLoading(false);
        this.setState({ loading: false });
        throw error;
      });
  }

  render() {
    const { loading, posts } = this.state;

    if(loading){
      return <p>Loading...</p>;
    } else if(!posts){
      return null;
    }

    return (
      <div>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(null, { setLoading })(Posts);
