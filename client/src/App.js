import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/Main/Main';
import EventPage from './pages/EventPage/EventPage';
import Layout from './components/Layout/Layout';

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
    path: '/popular',
    element: <Layout><div>popular</div></Layout>
  },
  {
    path: '/closest',
    element: <Layout><div>closest</div></Layout>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
