import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CartContext } from "../../Context/CartContext";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import CartEmpty from "../CartEmpty/CartEmpty";
export default function Cart() {
  const { clearCart,getCartUser,cartID, numOfCart, totalCartPrice, RemoveItem, allProducts, UpdateCart } =
    useContext(CartContext);
  const [count, setCount] = useState(0);

  // const [cartDetails, setCardDetails] = useState(null);

  // async function getCart() {
  //   let { data } = await getCartUser();
  //   setCardDetails(data);
  // }
  // useEffect(() => {
  //   getCart();
  // }, []);

  // function getCart() {
  //   return getCartUser();
  // }
  // const { data, isLoading, isError } = useQuery("getCart", getCart);

  // if (isLoading) {
  //   return (
  //     <div className="loader d-flex justify-content-center align-items-center vh-100 opacity-50 ">
  //       <RotatingLines
  //         visible={true}
  //         height="96"
  //         width="96"
  //         color="grey"
  //         strokeWidth="5"
  //         animationDuration="0.75"
  //         ariaLabel="rotating-lines-loading"
  //       />
  //     </div>
  //   );
  // }
  // console.log(data?.data.data.products);



  async function updateQuantityCart(id, newCount) {
    const response = await UpdateCart(id, newCount);
    console.log(response);
    if (response) {
      toast.success("Updated");
    }
  }

  async function removeProduct(id) {
    const res = await RemoveItem(id);
    if (res) {
      toast.success("Removed");
    } else {
      toast.error("error...");
    }
  }

async function clearAllProducts(){
  const res = await  clearCart()
  if(res){
    toast.success('cart has been Cleared..')
  }else{
    toast.error('error occured .. ')
  }
}



 async function createCashOrder(cartID){
    const shipping = {
      "shippingAddress":{
          "details": document.getElementById('details').value,
          "phone": document.getElementById('phone').value,
          "city": document.getElementById('city').value
          }
  }
  console.log(shipping);
     const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,shipping,{headers:{token: localStorage.getItem('tkn')}})
     console.log('confirmation payment',res.data);
     if(res.data.status == "success"){
      toast.success('Payemnet Successfully')
      getCartUser()

     }else{
      toast.error('error occured ... ')
     }
  }

  if (!allProducts) {
    return (
      <div className="loader d-flex justify-content-center align-items-center vh-100 opacity-50 ">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  return (

    <>
    {allProducts.length? <div className="container-fluid ">
        <div className="row bg-body-secondary">
          <div className="col-md-9 bg-body-secondary py-4">
            <div className="header py-3 ps-5 ">
              <h3 className="fw-bold">Shopping Bag:</h3>
              <p>
                <span className="fw-bold">{numOfCart} items </span>in your bag
              </p>
              <button onClick={clearAllProducts} className="btn btn-danger">clear Cart</button>
            </div>

            <div className="productItems bg-white p-4 rounded-5">
              <div className="row ">
                <div className="col-md-6 ps-5">
                  <h5 className="fw-bold">Product</h5>
                </div>
                <div className="col-md-2 text-center">
                  <h5 className="fw-bold">Price</h5>
                </div>
                <div className="col-md-2 text-center">
                  <h5 className="fw-bold">Quantity</h5>
                </div>
                <div className="col-md-2 text-center">
                  <h5 className="fw-bold">TotalPrice</h5>
                </div>
              </div>
              <div className="lineRow w-100 border mt-4 bg-danger "></div>

              {allProducts?.map((ele, idx) => (
                <div key={idx} className="row border-bottom">
                  <div className="col-md-6 ps-5">
                    <div className="d-flex mt-4">
                      <div className="image w-25">
                        <img
                          style={{ height: "100%", objectFit: "cover" }}
                          className="w-100"
                          src={ele.product.imageCover}
                          alt={ele.product.title}
                        />
                      </div>
                      <div className="text px-2 w-75">
                        <h6>{ele.product.category.name}</h6>
                        <p className="mb-3">{ele.product.title}</p>
                        <button
                          onClick={() => removeProduct(ele.product.id)}
                          className="btn btn-outline-danger"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="mt-4 fw-bold text-danger pt-2">
                      {ele.price}$
                    </p>
                  </div>

                  <div className="col-md-2 text-center">
                    <div className="d-flex mt-4  align-items-center justify-content-center">
                      <button
                        disabled={ele.count <= 1}
                        onClick={() =>
                          updateQuantityCart(ele.product.id, ele.count - 1)
                        }
                        className="btn btn-outline-dark pt-0 pb-0"
                      >
                        -
                      </button>
                      <p className="px-3 fs-5 pt-2 ">{ele.count}</p>
                      <button
                        onClick={() =>
                          updateQuantityCart(ele.product.id, ele.count + 1)
                        }
                        className="btn btn-outline-dark pt-0 pb-0"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="text-warning fw-bolder mt-4 pt-2">
                      {ele.price * ele.count}$
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 rounded-5 bg-white mb-3 mt-3">
            <div className="calculation my-4">
              <h3 className="fw-bold mb-4 px-4">Calculating shopping</h3>
              <div className="form text-center px-4">
                <input
                id="city"
                  type="text"
                  className="form-control  rounded-4 w-100"
                  placeholder="City"
                />
                <div className="d-flex mt-2">
                  <input
                  id="details"
                    type="text"
                    className="form-control rounded-4 w-50"
                    placeholder="details"
                  />
                  <input
                  id="phone"
                    type="text"
                    className="form-control w-50 rounded-4"
                    placeholder="phone"
                  />
                </div>
                <button
                  type="submit"
                  className="w-100 rounded-4 mt-3 btn btn-dark "
                >
                  Update
                </button>
                <div className="lineRow w-100 border mt-4 bg-danger h-25"></div>
                <div className="mt-3 text-lg-start copon">
                  <h3 className="fw-bold">Copon Code</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Animi natus nulla autem minima non est mollitia ab sunt odio
                    ut?
                  </p>

                  <input
                    type="text"
                    className="form-control rounded-4 w-100"
                    placeholder="Copon code"
                  />
                  <button
                    type="submit"
                    className="w-100 rounded-4 mt-3 btn btn-dark "
                  >
                    Apply
                  </button>
                </div>

                <div className="TotalCart p-3  text-lg-start rounded-5 mt-3 ">
                  <h4 className="fw-bold">Cart Details:</h4>

                  <div className="d-flex fw-bold mt-3 align-items-center justify-content-between">
                    <p className="fw-bold">Cart Suptitle:</p>
                    <p>$255</p>
                  </div>

                  <div className="d-flex fw-bold mt-1 align-items-center justify-content-between">
                    <p className="fw-bold">Cart Designed:</p>
                    <p>$322</p>
                  </div>

                  <div className="d-flex fw-bold mt-1 align-items-center justify-content-between">
                    <p className="fw-bold">Discount:</p>
                    <p className="text-white">%20</p>
                  </div>

                  <div className="d-flex fw-bold mt-1 align-items-center justify-content-between">
                    <p className="fw-bold fs-4 ">Cart Total:</p>
                    <p className="fs-4">${totalCartPrice}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-100 rounded-4 mt-1 btn btn-light "
                    onClick={()=> createCashOrder(cartID)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : <CartEmpty />  }
      
    </>
  );
}
