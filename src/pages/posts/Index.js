import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Protected from "../../components/Protected";
import Posts from "./Posts";
import PostEdit from "./PostEdit";

class PostsIndex extends PureComponent {
  render () {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.path} component={Protected(Posts)} />
        <Route path={`${match.path}/edit/:id`} component={Protected(PostEdit)} />
        <Redirect to={match.path} />
      </Switch>
    )
  }
}

export default PostsIndex;