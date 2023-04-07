import { useEffect } from 'react';
import Cookies from "js-cookie";

import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchAuthMe, selectIsAuthMe, selectIsAuth } from "./redux/slices/authSlice";

import Main from './pages/Main/Main';
import EventPage from './pages/EventPage/EventPage';
import CreateEventPage from './pages/CreateEventPage/CreateEventPage';
import Layout from './components/Layout/Layout';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import AllEvents from './pages/AllEvents/AllEvents';

import Test from './pages/Test/Test'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/event/:id',
    element: <EventPage />
  },
  {
    path: '/event/new',
    element: <CreateEventPage />
  },
  {
    path: '/closest',
    element: <Layout><div>closest</div></Layout>
  },
  {
    path: '/pay/:id',
    element: <Test></Test>
  },
  {
    path: '/login',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: "/reset-password/:token",
    element: <ChangePassword />,
  },
  {
    path: "/confirm/:token",
    element: <ConfirmEmail />
  },
  {
    path: '/events',
    element: <AllEvents />
  },
  {
    path: '/event/:id/edit',
    element: <CreateEventPage />
  }
]);

const userToken = Cookies.get("access_token") ? Cookies.get("access_token") : null;

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuthMe);
  console.log("isAuth", isAuth);

  useEffect(() => {
    if (userToken) {
      dispatch(fetchAuthMe(userToken));
    }
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
