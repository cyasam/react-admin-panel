import React from 'react';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 2,
  },
});

const PageHeader = props => {
  const { classes, children } = props;

  return (
    <Grid container justify="space-between" alignItems="center" className={classes.container}>
      { children }
    </Grid>
  );
};

export default withStyles(styles)(PageHeader);


