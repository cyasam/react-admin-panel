import React, { Component } from "react";
import axios from "axios";
import { getAuthToken } from '../helpers';

class PostDetail extends Component {
  state = {
    loading: true,
    post: null
  };
  componentDidMount() {
    this.setState({ loading: true });

    const token = getAuthToken();
    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios
      .get(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({ loading: false });

        const { data } = response;

        if (data) {
          this.setState({ post: data });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        throw error;
      });
  }

  render() {
    const { loading, post } = this.state;

    if(loading){
      return <p>Loading...</p>;
    } else if(!post){
      return null;
    }

    return (
      <div>
        <h2>{post.title}</h2>
      </div>
    );
  }
}

export default PostDetail;
