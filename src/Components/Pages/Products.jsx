import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import "../../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const fetchApi = async () => {
    try {
      const apiResp = await axios.get(
        "http://localhost:4000/products"
      );
      setProducts(apiResp.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Unable to fetch products");
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const viewmore = (productId) => {
    navigate(`/adminportal/viewmore/${productId}`);
  };

  const addToCart = (product) => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("nammaCart") || "[]"
      );

      const cart = Array.isArray(savedCart) ? savedCart : [];

      const existingProduct = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      let updatedCart;

      if (existingProduct) {
        updatedCart = cart.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: (Number(item.quantity) || 1) + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "nammaCart",
        JSON.stringify(updatedCart)
      );

      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Unable to add product to cart");
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchText = search.trim().toLowerCase();

    return (
      (product.title || "").toLowerCase().includes(searchText) ||
      (product.category || "").toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="products">
      <div className="heading">Products</div>

      <div className="product-search">
        <input
          type="search"
          placeholder="Search products by name or category..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search products"
        />

        {search && (
          <button
            type="button"
            onClick={() => handleSearch("")}
          >
            Clear
          </button>
        )}
      </div>

      <p className="search-results">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      <div className="cards">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((elem) => {
            const {
              id,
              title,
              price,
              category,
              image,
              rating,
            } = elem;

            return (
              <div className="card" key={id}>
                <div className="cat">{category}</div>

                <img src={image} alt={title} />

                <div className="title">{title}</div>

                <div className="box">
                  <div className="rating">
                    ⭐ {rating?.rate ?? "N/A"}
                  </div>

                  <div className="price">
                    ₹{Number(price).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    onClick={() => viewmore(id)}
                  >
                    View More
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart(elem)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try another product name or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
