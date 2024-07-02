import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { myToken } = useContext(AuthContext);
  const [numOfCart, setNumberOfCart] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);

  // console.log("x== from cart == ", myToken);
  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function getCartUser() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumberOfCart(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCartUser();
  }, [myToken]);

  return (
    <CartContext.Provider
      value={{ addToCart, getCartUser, numOfCart, totalCartPrice, allProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}
