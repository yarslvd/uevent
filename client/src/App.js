import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/Main/Main';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/login',
    element: <Layout><div>login</div></Layout>
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
