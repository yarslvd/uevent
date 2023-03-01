import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><div>wdadwadw</div></Layout>
  },
  {
    path: '/login',
    element: <div>login</div>
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
