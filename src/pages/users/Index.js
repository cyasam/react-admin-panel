import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Protected from "../../components/Protected";
import Users from "./Users";
import UserEdit from "./UserEdit";

class PostsIndex extends PureComponent {
  render () {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.path} component={Protected(Users)} />
        <Route path={`${match.path}/edit/:id`} component={Protected(UserEdit)} />
        <Redirect to={match.path} />
      </Switch>
    )
  }
}

export default PostsIndex;