import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Register/SignUp";
import Login from "./Components/Register/Login";
import ProfileContextProvider from "./Context/Profile";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectRoute/ProtectedRoute";
import Cart from "./Components/Cart/Cart";
import { QueryClient, QueryClientProvider } from "react-query";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Categories from "./Components/Categories/Categories";

import SubCategories from "./Components/SubCategories/SubCategories";
import CartContextProvider from "./Context/CartContext";
import Brands from "./Components/Brands/Brands";
import NotFound from "./Components/NotFoundPage/NotFound";
import SubBrands from "./Components/SubBrands/SubBrands";

const routes = createHashRouter([
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
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "category/:id/subcategories",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "SubBrands/:id",
        element: (
          <ProtectedRoute>
            <SubBrands />
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

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
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
          <CartContextProvider>
            <RouterProvider router={routes} />
          </CartContextProvider>
          <ToastContainer />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
