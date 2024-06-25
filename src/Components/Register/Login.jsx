import React, { useState ,useContext } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import img from "../../assets/images/blog-2.jpg";
import './Register.css'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


export default function Login() {
  const [isSuccess, setIsSuccess] = useState(false)
const [iserror, setIserror] = useState(undefined)
const [isLoading, setIsLoading] = useState(false)

const {setToken ,setUser}= useContext(AuthContext)
const navigate =  useNavigate()

  const userData = {
    
    email: "",
     
    password: "",
     
  };

  const validationSchema = Yup.object({
   
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  
  });

  async function submit(values) {
    setIsLoading(true); 

    console.log(values);
    const res = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {

        if(res.data.message=== "success"){


          console.log("data" , res.data.user);
          localStorage.setItem('userData' , res.data.user)
          setUser(res.data.user)
          console.log("token==", res.data.token);
          localStorage.setItem('tkn' , res.data.token)
          setToken(res.data.token)
          setIsSuccess(true);
          setInterval(() => {
            setIsSuccess(false);
          }, 2000);
          
          setIsLoading(false);
          navigate('/');
        }
     

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
    

          {isSuccess?  <div className="alert text-center alert-success">Welcome Back</div> : ""}
      
      {iserror?  <div className="alert text-center alert-danger">{iserror}</div> : ""}
          <h2>Login Now:</h2>
          <form onSubmit={myForm.handleSubmit}>
            
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
                autoComplete="current-password"
              />
              {myForm.errors.password && myForm.touched.password ? (
                <div className="alert alert-danger">
                  {myForm.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            

            <button
              type="submit"
              disabled={!(myForm.isValid && myForm.dirty)}
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
              />: "Login"}
              


            </button>
          </form>
        </div>
      </div>
    </>
  );
}
