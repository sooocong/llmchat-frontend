import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import {
  createBrowserRouter,
  Params,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import {
  MainPage,
  LoginPage,
  MyPage,
  SignupPage,
  ErrorPage,
  SearchPage,
} from './pages';
import GoogleRedirect from './components/Login/GoogleRedirect';
import KakaoRedirect from './components/Login/KakaoRedirect';
import NaverRedirect from './components/Login/NaverRedirect';
import { getAccessToken } from './utils';
import { UserAPI, ThreadAPI } from './apis';

const notAuthLoader = async () => {
  const token = getAccessToken();
  if (!token) {
    throw redirect('/login');
  }
  const user = await UserAPI.getUserProfile();

  return { user };
};
const authLoader = async () => {
  const token = getAccessToken();
  if (token) {
    throw redirect('/');
  }
  return { token };
};
const searchLoader = async ({ params }: { params: Params }) => {
  const token = getAccessToken();
  if (!token) {
    throw redirect('/login');
  }
  const user = await UserAPI.getUserProfile();
  const searchedThreads = await ThreadAPI.getSearchedThreadList(
    params.query as string
  );

  return { user, searchedThreads, query: params.query };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage />, loader: notAuthLoader },
      {
        path: '/login',
        element: <LoginPage />,
        loader: authLoader,
      },
      {
        path: '/login/google/callback',
        element: <GoogleRedirect />,
        loader: authLoader,
      },
      {
        path: '/login/naver/callback',
        element: <NaverRedirect />,
        loader: authLoader,
      },
      {
        path: '/login/kakao/callback',
        element: <KakaoRedirect />,
        loader: authLoader,
      },
      {
        path: '/signup',
        element: <SignupPage />,
        loader: authLoader,
      },
      {
        path: '/mypage',
        element: <MyPage />,
        loader: notAuthLoader,
      },
      {
        path: '/search/:query',
        element: <SearchPage />,
        loader: searchLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
