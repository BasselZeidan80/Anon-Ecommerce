import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo/favicon.ico";
import svgIcon from "../../assets/images/logo/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext";
export default function Navbar({ setSearchQuery }) {
  const { user, myToken, setToken } = useContext(AuthContext);
  // console.log("user==", user);
  // console.log("token In Nvabar ==", myToken);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function logOut() {
    //1 set token == null
    setToken(null);

    //2 remove localStorage
    localStorage.clear();
    //3 navigate
    navigate("/Login");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    // navigate('/Home');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg   bg-body-tertiary">
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to="/">
            <div className="handleImgSize">
              <figure>
                <img className="w-100" src={logo} alt="favicon" />
              </figure>
              <figure>
                <img className="w-100" src={svgIcon} alt="svgIcon" />
              </figure>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {myToken ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {myToken ? (
                <>
                  <li className="nav-item">
                    <ul className="d-flex  list-unstyled">
                      <li>
                        <i className="me-2  fa-brands fa-instagram"></i>
                      </li>
                      <li>
                        <i className="me-2 fa-brands fa-facebook"></i>
                      </li>
                      <li>
                        <i className="me-2 fa-brands fa-linkedin"></i>
                      </li>
                      <li>
                        <i className="me-2 fa-brands fa-github"></i>
                      </li>
                    </ul>
                  </li>

                  <form
                    className="d-flex"
                    role="search"
                    onSubmit={handleSearch}
                  >
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      Profile {user.name}
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/Register"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Register
                </Link>
                <ul className="dropdown-menu">
                  {myToken ? (
                    <li>
                      <span onClick={logOut} className="dropdown-item">
                        SignOut
                      </span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
