import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Loading, Protected } from '../../components';

export const Posts = Loadable({
  loader: () => import('./Posts'),
  loading: Loading,
});

export const PostEdit = Loadable({
  loader: () => import('./PostEdit'),
  loading: Loading,
});

class PostsIndex extends PureComponent {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.path} component={Protected(Posts)} />
        <Route
          path={`${match.path}/edit/:id`}
          component={Protected(PostEdit)}
        />
        <Redirect to={match.path} />
      </Switch>
    );
  }
}

export default PostsIndex;
