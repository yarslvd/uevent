import {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
import Profile from './pages/Profile/Profile';
import OrganizationPage from './pages/OrganizationPage/OrganizationPage';
import PublicProfile from './pages/PublicProfile/PublicProfile';
import { fetchAuthMe, selectIsAuthMe } from "./redux/slices/authSlice";

import Test from './pages/Test/Test'

import './styles/App.scss';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/organization/:id',
    element: <OrganizationPage />
  },
  {
    path: '/user/:id',
    element: <PublicProfile />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

const userToken = Cookies.get("access_token") ? Cookies.get("access_token") : null;

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuthMe);
  console.log("isAuth", isAuth);

  useEffect(() => {
    const getMe = async () => {
      try {
        console.log("waiting to fetch me", isLoading)
        setIsLoading(true)
        await dispatch(fetchAuthMe(userToken));
      }
      catch (e) {
        console.log("error while fetching me: ",e)
      }
      finally {
        setIsLoading(false)
      }
    }
    getMe()
  }, []);

  if (isLoading) {
      return( <div style={{ width: '100vh', height: '100wh' }}><CircularProgress sx={{ top: '50%', left: '50%  ' }}/></div>)
  }

  return (
      <RouterProvider router={router}/>
  );
}

export default App;