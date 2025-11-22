import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Home } from './pages/Home.jsx'
import UserContext from '../context/UserContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserContext>
      <App />
    </UserContext>,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/',
        element: <Home />
      },
    ],
  }
]);


const root = createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
)

