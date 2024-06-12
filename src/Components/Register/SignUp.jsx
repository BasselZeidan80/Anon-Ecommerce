import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
export default function SignUp() {
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
    console.log(values);
    const res = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("====err", err.response.data.message);
      });
  }

  const myForm = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,

    onSubmit: submit,
  });

  // async function sendUserData(values) {
  //   const res = await axios
  //     .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   console.log(res.data);
  // }

  return (
    <>
      <div className="designContent d-flex   align-items-center justify-content-center h-100">
        <div className="container p-5">
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
              className="p-2 text-white rounded-3 btn bg-main"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
