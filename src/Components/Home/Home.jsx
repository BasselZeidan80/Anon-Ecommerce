import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import { Link, useOutletContext } from "react-router-dom";
import StarRating from "../StartRating/StarRating";
import "./Home.css";
import placeHolderImage from "../../assets/images/placeHolderImage.png";
import { Bounce, toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [inputPerPage, setInputPerPage] = useState(itemsPerPage);
  const { searchQuery, setSearchResults, searchResults } = useOutletContext();
  const [isLoad, setIsLoad] = useState(false);
  const { addToCart } = useContext(CartContext);

  async function addProduct(id) {
    setIsLoad(true);
    let response = await addToCart(id);
    console.log("======responseAddToCart ====", response.data.status);
    if (response.data.status == "success") {
      setIsLoad(false);
      toast.success("Product added successfully to your cart!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // toast.promise("ssssss");
    } else {
      setIsLoad(false);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // toast.error("Something went wrong");
    }
  }

  // use react query to handle cache data
  const fetchProducts = async () => {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return res.data.data;
  };

  const {
    data: allProducts = [],
    isLoading,
    isError,
  } = useQuery("products", fetchProducts);

  // Update search results based on search query

  useEffect(() => {
    if (searchQuery) {
      const results = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results : null);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, allProducts, setSearchResults]);

  // Determine which products to display based on search results or all products
  const productsToShow = searchResults !== null ? searchResults : allProducts;

  // Calculate pagination variables
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productsToShow.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input change for items per page
  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 10) {
      console.log("lessThan 10");
      return;
    }
    if (!isNaN(value)) {
      setItemsPerPage(value);
      setInputPerPage(value);
      setCurrentPage(1); // Reset to first page when items per page changes
    }
  };

  if (isLoading) {
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

  if (isError) {
    return <div>Error fetching products</div>;
  }

  return (
    <div className="containerCst">
      {/* Header with items per page input */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 mb-2">
        <h2 className="mb-0 text-success fw-bold">Products:</h2>
        <div>
          <label htmlFor="itemsPerPage" className="me-2 text-primary fw-bold">
            Items Per Page:
          </label>
          <input
            type="number"
            id="itemsPerPage"
            min="10"
            max="100"
            value={inputPerPage}
            onChange={handlePerPageChange}
            className="form-control d-inline w-auto"
          />
        </div>
      </div>
      {/* Display current products */}
      <div className="row">
        {currentProducts.length > 0 ? (
          currentProducts.map((ele, idx) => (
            <div key={idx} className="col-md-3 col-lg-2 col-sm-12 my-2">
              <div className="product-card">
                <Link to={`/ProductDetails/${ele.id}`}>
                  <div className="product-image">
                    <img
                      src={ele.imageCover || placeHolderImage}
                      className="w-100"
                      alt="Product Image"
                    />
                  </div>
                </Link>
                <div className="product-info">
                  <div className="category">{ele.category.name}</div>
                  <h2 className="title">
                    {ele.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  {ele.priceAfterDiscount ? (
                    <div className="price fs-5">
                      ${ele.priceAfterDiscount} -{" "}
                      <span className="text-decoration-line-through">
                        ${ele.price}
                      </span>
                    </div>
                  ) : (
                    <div className="price fs-5">${ele.price}</div>
                  )}
                  <StarRating rating={ele.ratingsAverage} />
                  <div className="buttons">
                    <button
                      onClick={() => addProduct(ele.id)}
                      className="add-to-cart"
                    >
                      {isLoad ? (
                        <ColorRing
                          visible={true}
                          height="30"
                          width="80"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                        />
                      ) : (
                        " Add To Cart"
                      )}
                      <i class="fa-solid fa-cart-shopping cartIcon"></i>
                    </button>
                    <button className="add-to-favorite">
                      <i class="fa-solid fa-heart heartIcon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
      {/* Pagination component */}
      {productsToShow.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={productsToShow.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
