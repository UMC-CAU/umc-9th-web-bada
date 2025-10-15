import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./pages/HomPage.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import HomeLayout from "./layouts/HomeLayout.tsx"
import SignupPage from "./pages/SignupPage.tsx"
import MyPage from "./pages/MyPage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage/>},
      {path:"login", element: <LoginPage />},
      {path:"signup", element: <SignupPage/>},
      {path: "my", element: <MyPage/>},
  ],
  },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
