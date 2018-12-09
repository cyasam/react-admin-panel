import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import { Loading, Protected } from '../../components';

export const Users = Loadable({
  loader: () => import('./Users'),
  loading: Loading,
});

export const UserEdit = Loadable({
  loader: () => import('./UserEdit'),
  loading: Loading,
});

export const UserAdd = Loadable({
  loader: () => import('./UserAdd'),
  loading: Loading,
});

class PostsIndex extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.path} component={Protected(Users)} />
        <Route
          path={`${match.path}/edit/:id`}
          component={Protected(UserEdit)}
        />
        <Route path={`${match.path}/new`} component={Protected(UserAdd)} />
        <Redirect to={match.path} />
      </Switch>
    );
  }
}

export default PostsIndex;
