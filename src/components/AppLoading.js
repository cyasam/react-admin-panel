import React, { Component, Fragment } from "react";

import LinearProgress from '@material-ui/core/LinearProgress';

class AppLoading extends Component {
  state = {
    completed: 0,
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    const { loading } = this.props;
    
    if (!loading || completed === 100) {
      setTimeout(() => {
        this.setState({ completed: 0 });
        clearInterval(this.timer);
      }, 1000)
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  }

  render() {
    const { completed } = this.state;
    const { loading } = this.props;
    return (
      <Fragment>
        {(loading || completed !== 0) && <LinearProgress color="secondary" variant="determinate" value={completed} /> }
      </Fragment>
    );
  }
}



export default AppLoading;
