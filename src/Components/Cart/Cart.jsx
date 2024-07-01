import React from 'react'
import './Cart.css'
export default function Cart() {
  return <>
  
  <div className="container-fluid ">
    <div className="row bg-body-secondary">
      <div className="col-md-9 bg-body-secondary py-4">
      <div className="header py-3 ps-5 ">
    <h3 className='fw-bold'>Shopping Bag:</h3>
    <p> <span className='fw-bold'>2 items </span> in your bag</p>
    </div>

    <div className="productItems bg-white p-4 rounded-5">

      <div className="row ">
        <div className="col-md-6 ps-5">
        <h5 className='fw-bold'>Product</h5>

        </div>
        <div className="col-md-2 text-center">
        <h5 className='fw-bold'>Price</h5>

        </div>
        <div className="col-md-2 text-center">
        <h5 className='fw-bold'>Quantity</h5>

        </div>
        <div className="col-md-2 text-center">
        <h5 className='fw-bold'>TotalPrice</h5>

        </div>
      </div>
  <div className="lineRow w-100 border mt-4 bg-danger "></div>

  <div className="row">
    <div className="col-md-6 ps-5">
      <div className="d-flex mt-4">
        <div className="image w-25">
          <img style={{height: "100%" , objectFit: 'cover'}} className='w-100' src={require('../../assets/images/banner-2.jpg')} alt="" />
        </div>
        <div className="text px-2 w-75">
          <h6>category</h6>
          <p className='mb-3'>woman bag and Accessories</p>
          <p>color</p>
          <p>size</p>

        </div>
      </div>
    </div>
    <div className="col-md-2 text-center">
      <p className='mt-4 fw-bold text-danger pt-2'>2000$</p>
    </div>
    <div className="col-md-2 text-center">
      <div className="d-flex mt-4  align-items-center justify-content-center">
        <button className='btn btn-outline-dark pt-0 pb-0'>-</button>
        <p className='px-3 fs-5 pt-2 '>1</p>
        <button className='btn btn-outline-dark pt-0 pb-0'>+</button>
      </div>
    </div>
    <div className="col-md-2 text-center">
      <p className='text-warning fw-bolder mt-4 pt-2'>61.00$</p>
    </div>
  </div>
  <div className="lineRow w-100 border mt-4 bg-danger "></div>
 


 

</div>


   
      </div>
      <div className="col-md-3 rounded-5 bg-white mb-3 mt-3">
      <div className="calculation my-4">
  <h3 className='fw-bold mb-4 px-4'>Calculating shopping</h3>
  <div className="form text-center px-4">

  <input type="text" className='form-control  rounded-4 w-100' placeholder='Country' />
  <div className="d-flex mt-2">
  <input type="text" className='form-control rounded-4 w-50' placeholder='Birth Date' />
  <input type="text" className='form-control w-50 rounded-4' placeholder='zip code' />
  </div>
  <button type='submit' className='w-100 rounded-4 mt-3 btn btn-dark '>Update</button>
  <div className="lineRow w-100 border mt-4 bg-danger h-25"></div>
  <div className="mt-3 text-lg-start copon">
<h3 className='fw-bold'>Copon Code</h3 >
<p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi natus nulla autem minima non est mollitia ab sunt odio ut?</p>

<input type="text" className='form-control rounded-4 w-100' placeholder='Copon code' />
<button type='submit' className='w-100 rounded-4 mt-3 btn btn-dark '>Apply</button>


</div>




<div className="TotalCart p-3  text-lg-start rounded-5 mt-3 ">
  <h4 className='fw-bold'>Cart Details:</h4>

<div className="d-flex fw-bold mt-3 align-items-center justify-content-between">

  <p className='fw-bold'>Cart Suptitle:</p>
  <p>$255</p>
  </div>

  
<div className="d-flex fw-bold mt-1 align-items-center justify-content-between">

<p className='fw-bold'>Cart Designed:</p>
<p>$322</p>
</div>


<div className="d-flex fw-bold mt-1 align-items-center justify-content-between">

  <p className='fw-bold'>Discount:</p>
  <p className='text-white'>%20</p>
  </div>

  
<div className="d-flex fw-bold mt-1 align-items-center justify-content-between">

<p className='fw-bold fs-4 '>Cart Total:</p>
<p className='fs-4'>$445</p>
</div>

<button type='submit' className='w-100 rounded-4 mt-1 btn btn-light '>Apply</button>

</div>

  </div>
</div>
      </div>  
    </div>

  </div>
  </>
}
