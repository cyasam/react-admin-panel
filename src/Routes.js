import Loadable from 'react-loadable';
import Loading from "./components/Loading";

export const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading
})

export const Posts = Loadable({
  loader: () => import('./pages/Posts'),
  loading: Loading
})

export const PostDetail = Loadable({
  loader: () => import('./pages/PostDetail'),
  loading: Loading
})

export const Users = Loadable({
  loader: () => import('./pages/Users'),
  loading: Loading
})

export const UsersDetail = Loadable({
  loader: () => import('./pages/UsersDetail'),
  loading: Loading
})

export const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: Loading
})