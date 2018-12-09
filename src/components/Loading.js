import { Component } from 'react';
import { connect } from 'react-redux';

import { setLoading } from '../actions';

class Loading extends Component {
  componentDidMount() {
    this.props.setLoading(true);
  }
  render() {
    return null;
  }
}

export default connect(
  null,
  { setLoading },
)(Loading);
