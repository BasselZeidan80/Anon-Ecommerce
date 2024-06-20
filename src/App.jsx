 
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Register/SignUp";
import Login from "./Components/Register/Login";
import NotFound from "./Components/NotFound/NotFound";
import ProfileContextProvider from "./Context/Profile";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectRoute/ProtectedRoute";
import Cart from "./Components/Cart/Cart";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "Home", element: <ProtectedRoute> <Home /> </ProtectedRoute>  },
      { path: "Cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>  },
      { index: true, element: <SignUp /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "Login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
   

  return (
    <>
    <AuthContextProvider>

      <RouterProvider router={routes} />
      </AuthContextProvider>
    </>
  );
}
