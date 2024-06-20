import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import { RotatingLines } from "react-loader-spinner";
import { useOutletContext } from "react-router-dom";
import StarRating from "../StartRating/StarRating";
import "./Home.css";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default value
  const [inputPerPage, setInputPerPage] = useState(itemsPerPage); // Input field value

  const { searchQuery, setSearchResults, searchResults } = useOutletContext();

  // Fetch all products from API
  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setAllProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getAllProducts();
  }, []);

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
  const currentProducts = productsToShow.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input change for items per page
  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if(value < 10){
      console.log("lessThan 10");
      return
    }
     
    if (!isNaN(value)) {
      setItemsPerPage(value);
      setInputPerPage(value);
      setCurrentPage(1); // Reset to first page when items per page changes
    }
  };

  return (
    <>
      {!allProducts.length ? (
        <div className="loader d-flex justify-content-center align-items-center vh-100 opacity-50 bg-primary">
          <RotatingLines visible={true} height="96" width="96" color="grey" strokeWidth="5" animationDuration="0.75" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass="" />
        </div>
      ) : (
        <div className="containerCst">
          {/* Header with items per page input */}
          <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
            <h2 className="mb-0 text-success fw-bold">Products:</h2>
            <div>
              <label htmlFor="itemsPerPage" className="me-2 text-primary fw-bold">Items Per Page:</label>
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
                <div key={idx} className="col-md-2 col-lg-2 col-sm-12 my-2">
                  <div className="product-card">
                  <div className="product-image">
                      <img src={ele.imageCover} className="w-100" alt="Product Image" />
                    </div>
                    <div className="product-info">
                      <div className="category">{ele.category.name}</div>
                      {ele.title.length < 1000 ? (
                        <h2 className="title">{ele.title.slice(0, 20) + "..."}</h2>
                      ) : (
                        <h2 className="title">{ele.title}</h2>
                      )}
                      <div className="price">${ele.price}</div>
                      <StarRating rating={ele.ratingsAverage} />
                      <div className="buttons">
                        <button className="add-to-cart">Add to Cart</button>
                        <button className="add-to-favorite">❤</button>
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
            <Pagination itemsPerPage={itemsPerPage} totalItems={productsToShow.length} paginate={paginate} currentPage={currentPage} />
          )}
        </div>
      )}
    </>
  );
}
