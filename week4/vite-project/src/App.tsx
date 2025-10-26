import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomPage.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import HomeLayout from "./layouts/HomeLayout.tsx"
import SignupPage from "./pages/SignupPage.tsx"
import MyPage from "./pages/MyPage.tsx"
import { AuthProvider } from './context/AuthContext.tsx';
import { type RouteObject } from 'react-router-dom';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import GoogleLoginRedirectPage from './pages/GoogleLoginRedirectPage.tsx';

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage/>},
      {path:"login", element: <LoginPage />},
      {path:"signup", element: <SignupPage/>},
      {path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage/>},
  ],
  },
];

const protectedRoutes: RouteObject[] = [
{
  path: "/",
  element: <ProtectedLayout />,
  errorElement: <NotFoundPage/>,
  children: [
      {path: "my", element: <MyPage/>},
],
}
];

const routes = [...publicRoutes, ...protectedRoutes];

const router = createBrowserRouter(routes);

function App() {
  return (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>);
}

export default App;
