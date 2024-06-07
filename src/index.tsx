import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { MainPage, LoginPage, MyPage, SignupPage, ErrorPage } from './pages';
import { getAccessToken } from './utils/storage';
import GoogleRedirect from './components/Login/GoogleRedirect';
import KakaoRedirect from './components/Login/KakaoRedirect';
import NaverRedirect from './components/Login/NaverRedirect';
import { UserAPI } from './apis';

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
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
