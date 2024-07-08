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
  const [count, setCount] = useState(0);
  const [cartID, setCartID] = useState(null);

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
      .then((response) => {
        getCartUser();
        return response;
      })
      .catch((err) => err);
  }

  async function getCartUser() {
    const flag = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setNumberOfCart(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartID(res.data.data._id);
        localStorage.setItem("userId", res.data.data.cartOwner);
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return flag;
  }

  /////////////////////////////////////////////////////
  // function getUserCart() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/cart", {
  //       headers: { token: localStorage.getItem("token") },
  //     })
  //     .then((res) => {
  //       console.log("res", res.data);
  //       setAllProducts(res.data.data.products);

  //       console.log("All products ", res.data.data.products);
  //       setNumOfCart(res.data.numOfCartItems);
  //       console.log("num oF Carts ", res.data.numOfCartItems);
  //       setTotalCartPrice(res.data.data.totalCartPrice);
  //       console.log("total Price", res.data.data.totalCartPrice);
  //       setCartID(res.data.data._id);
  //       console.log("CartID  ", res.data.data._id);
  //       // setCartOwner(res.data.data.cartOwner)
  //       localStorage.setItem("userId", res.data.data.cartOwner);
  //       // console.log("cartOwner" , res.data.data.cartOwner);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  ///////////////////////////////////////////////////
  async function UpdateCart(id, newCount) {
    const Flag = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        { headers: { token: localStorage.getItem("tkn") } }
      )
      .then((res) => {
        setTotalCartPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        setNumberOfCart(res.data.numOfCartItems);
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return Flag;
  }

  async function RemoveItem(id) {
    const Flag = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumberOfCart(res.data.numOfCartItems);
        setTotalCartPrice(res.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        console.log(res);
        return true;
      })
      .catch((error) => {
        console.log(error);

        return false;
      });
    return Flag;
  }

  async function clearCart() {
    const Flag = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("tkn") },
      })
      .then((res) => {
        setNumberOfCart(null);
        setTotalCartPrice(0);
        setAllProducts([]);
        console.log(res);
        return true;
      })
      .catch((error) => {
        console.log(error);

        return false;
      });
    return Flag;
  }

  useEffect(() => {
    if (myToken) {
      getCartUser();
    } else {
      setNumberOfCart(null);
      setTotalCartPrice(0);
      setAllProducts([]);
      setCartID(null);
    }
  }, [myToken]);

  return (
    <CartContext.Provider
      value={{
        RemoveItem,
        addToCart,
        getCartUser,
        numOfCart,
        totalCartPrice,
        allProducts,
        UpdateCart,
        cartID,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
