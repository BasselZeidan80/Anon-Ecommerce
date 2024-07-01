import { createContext, useContext } from "react";
import React from 'react'
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext()

export default function CartContextProvider({children}) {
const {myToken}= useContext(AuthContext)


console.log("x== from cart == " ,myToken);
async function addToCart(id){
    
 await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
    { productId: id}
    ,
    {headers: {
    token: localStorage.getItem('tkn')
}})
.then(
    (res)=> {console.log('in case of success====',res) 
        
        return res;
    }
)
.catch((err)=> console.log('in case of error =====',err))


}


  return <CartContext.Provider value={{addToCart}}>
{children}
  </CartContext.Provider>
}
