import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class CustomSnackbar extends Component {
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    const { closeSnackBar } = this.props;
    closeSnackBar();
  };

  render() {
    const {
      classes,
      children,
      anchorOrigin,
      open,
      variant,
      autoHideDuration
    } = this.props;

    return (
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        onClose={this.handleClose}
        autoHideDuration={autoHideDuration}
      >
        <SnackbarContent
          aria-describedby="message-id"
          className={classes[variant]}
          message={
            <span id="message-id" className={classes.message}>
              {children}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

CustomSnackbar.defaultProps = {
  anchorOrigin: { vertical: "top", horizontal: "center" }
};

export default withStyles(styles)(CustomSnackbar);
