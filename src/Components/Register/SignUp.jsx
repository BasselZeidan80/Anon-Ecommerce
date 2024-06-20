import React, { useState } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import img from "../../assets/images/blog-1.jpg";
import './Register.css'
import { useNavigate } from "react-router-dom";
export default function SignUp() {
const [isSuccess, setIsSuccess] = useState(false)
const [iserror, setIserror] = useState(undefined)
const [isLoading, setIsLoading] = useState(false)



const navigate =  useNavigate()

  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });



  
  async function submit(values) {
    setIsLoading(true); 

    console.log(values);
    const res = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        console.log(res.data);
        setIsSuccess(true);
        setIsLoading(false);
        setInterval(() => {
          setIsSuccess(false);
          navigate('/login');
        }, 2000);


      })
      .catch((err) => {
        setIsLoading(false);
        console.log("====err", err.response.data.message);
        setIserror(err.response.data.message);
        setInterval(() => {
          setIserror(undefined);
        }, 2000);
      });
  }

  const myForm = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,

    onSubmit: submit,
  });
 
  return (
    <>
      <div className="designContent d-flex   align-items-center justify-content-between ">


        <figure className="imgCst hide-on-small-screen">
          <img src={img}  alt="" />
        </figure>

        <div className="container p-5">
    

          {isSuccess?  <div className="alert text-center alert-success">congratulations your account has been created</div> : ""}
      
      {iserror?  <div className="alert text-center alert-danger">{iserror}</div> : ""}
          <h2>Register Now:</h2>
          <form onSubmit={myForm.handleSubmit}>
            <div className="form-group my-3">
              <label className="pb-2" htmlFor="name">
                Name:
              </label>
              <input
                onBlur={myForm.handleBlur}
                onChange={myForm.handleChange}
                value={myForm.values.name}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="form-control"
              />

              {myForm.errors.name && myForm.touched.name ? (
                <div className="alert alert-danger">{myForm.errors.name}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label className="pb-2" htmlFor="email">
                Email:
              </label>
              <input
                onBlur={myForm.handleBlur}
                onChange={myForm.handleChange}
                value={myForm.values.email}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-control"
                autoComplete="username"
              />
              {myForm.errors.email && myForm.touched.email ? (
                <div className="alert alert-danger">{myForm.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label className="pb-2" htmlFor="phone">
                Phone:
              </label>
              <input
                onBlur={myForm.handleBlur}
                value={myForm.values.phone}
                onChange={myForm.handleChange}
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter your phone"
                className="form-control"
              />
              {myForm.errors.phone && myForm.touched.phone ? (
                <div className="alert alert-danger">{myForm.errors.phone}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label className="pb-2" htmlFor="password">
                Password:
              </label>
              <input
                onBlur={myForm.handleBlur}
                onChange={myForm.handleChange}
                value={myForm.values.password}
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-control"
                autoComplete="new-password"
                
              />
              {myForm.errors.password && myForm.touched.password ? (
                <div className="alert alert-danger">
                  {myForm.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group my-3">
              <label className="pb-2" htmlFor="rePassword">
                Confirm Password:
              </label>
              <input
                onBlur={myForm.handleBlur}
                onChange={myForm.handleChange}
                value={myForm.values.rePassword}
                type="password"
                id="rePassword"
                name="rePassword"
                placeholder="Enter your password again"
                className="form-control"
                autoComplete="new-password"
              />
              {myForm.errors.rePassword && myForm.touched.rePassword ? (
                <div className="alert alert-danger">
                  {myForm.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              disabled={!(myForm.isValid&& myForm.dirty)}
              className="p-2 text-white rounded-3 btn bg-main"
            >
              


              {isLoading?<ColorRing
              visible={true}
              height="30"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              />: "Register"}
              


            </button>
          </form>
        </div>
      </div>
    </>
  );
}
