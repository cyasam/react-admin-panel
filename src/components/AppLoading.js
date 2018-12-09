import React, { Component, Fragment } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

class AppLoading extends Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 10);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    const { loading } = this.props;

    if (!loading || completed === 100) {
      this.setState({ completed: 0 });
      clearInterval(this.timer);
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    const { completed } = this.state;
    return (
      <Fragment>
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={completed}
        />
      </Fragment>
    );
  }
}

export default AppLoading;
