import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from './pages/Main/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
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
