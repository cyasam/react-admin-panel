import Loadable from 'react-loadable';
import { Loading } from './components';

export const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading,
});

export const PostsIndex = Loadable({
  loader: () => import('./pages/posts/Index'),
  loading: Loading,
});

export const UsersIndex = Loadable({
  loader: () => import('./pages/users/Index'),
  loading: Loading,
});

export const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: Loading,
});
