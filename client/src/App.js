import './App.css'
import Navbar from './components/Navbar/Navbar'
import AllBlogs from './components/Pages/AllBlogs/AllBlogs'
import Home from './components/Pages/Home/Home'
import Trending from './components/Pages/Trending/Trending'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './components/login/Login.jsx'
import SignUp from './components/signUp/SignUp.jsx'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Write from './components/write/Write'
import Show from './components/Show/Show'

const queryClient = new QueryClient()

function App() {
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/register" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <SignUp />,
    },
    {
      path: '/blogs',
      element: (
        <ProtectedRoute>
          <Navbar />
          <Home />
          <Trending />
          <AllBlogs />
        </ProtectedRoute>
      ),
    },
    {
      path: '/blogs/new',
      element: (
        <div>
          <Navbar />
          <Write />
        </div>
      ),
    },
    {
      path: '/blogs/:id',
      element: (
        <div>
          <Navbar />
          <Show />
        </div>
      ),
    },
    {
      path: '/blogs/:id/edit',
      element: (
        <div>
          <Navbar />
          <Write />
        </div>
      ),
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
