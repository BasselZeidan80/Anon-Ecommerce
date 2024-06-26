import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Register/SignUp";
import Login from "./Components/Register/Login";
import NotFound from "./Components/NotFound/NotFound";
import ProfileContextProvider from "./Context/Profile";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectRoute/ProtectedRoute";
import Cart from "./Components/Cart/Cart";
import { QueryClient, QueryClientProvider } from "react-query";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "Home",
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      // { index: true, element: <SignUp /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "SignUp", element: <SignUp /> },
      { path: "Login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <RouterProvider router={routes} />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
