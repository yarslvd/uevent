import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/Main/Main';
import EventPage from './pages/EventPage/EventPage';
import CreateEventPage from './pages/CreateEventPage/CreateEventPage';
import Layout from './components/Layout/Layout';

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
    path: '/pay',
    element: <Test></Test>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
