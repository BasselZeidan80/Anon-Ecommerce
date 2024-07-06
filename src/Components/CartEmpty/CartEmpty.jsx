// src/CartEmpty.js
import React from 'react';
import './CartEmpty.css'; // Optional for styling
import { useNavigate } from 'react-router-dom';

const CartEmpty = () => {
    const nav = useNavigate()
  return <>
  
  <div className="container d-flex align-items-center justify-content-center flex-column">
    <div className="imageCartEm">
        <img className='w-100' src={require('../../assets/images/cartEmptyImage.png')} alt="" />

    </div>
    <div className="textEmpty">
    <h2 className='fade-in-text' >Your Cart is Empty</h2>
    </div>
    <button  onClick={()=> nav('/Home')}  className=' my-4 btn btn-success'>Go To Shopping</button>
  </div>
  
  </> 
//   (
//     <div className="cart-empty">
//       <img 
//         src= {require('../../assets/images/cartEmptyImage.png')}
//         alt="Empty cart"
//         className=" cart-empty-image"
//       />
//       <h2>Your Cart is Empty</h2>
//       <button onClick={()=> nav('/Home')} className='btn btn-success'>Go To Shopping</button>
//     </div>
//   );
};

export default CartEmpty;
