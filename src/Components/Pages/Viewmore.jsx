
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Viewmore.css";
import { toast } from "react-toastify";

const CART_KEY = "nammaCart";

const Viewmore = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single product
  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const apiResp = await axios.get(
        `http://localhost:4000/products/${id}`
      );

      setProduct(apiResp.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Unable to load product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  // Add product to cart
  const addToCart = (product) => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem(CART_KEY) || "[]"
      );

      if (!Array.isArray(savedCart)) {
        throw new Error("Invalid cart data");
      }

      const existingItem = savedCart.find(
        (item) => String(item.id) === String(product.id)
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = savedCart.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + 1,
              }
            : item
        );
      } else {
        updatedCart = [
          ...savedCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        CART_KEY,
        JSON.stringify(updatedCart)
      );

      toast.success(`${product.title} added to cart!`);
    } catch (err) {
      console.error("Error adding product to cart:", err);
      toast.error("Unable to add product to cart.");
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Do you want to delete this product?"
    );

    if (!confirmed) {
      toast.warn("Product was not deleted.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:4000/products/${productId}`
      );

      toast.success("Product deleted successfully!");
      navigate("/adminportal/products");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    }
  };

  if (loading) {
    return <div className="view-message">Loading product...</div>;
  }

  if (error) {
    return <div className="view-message">{error}</div>;
  }

  if (!product) {
    return <div className="view-message">Product not found.</div>;
  }

  const {
    title,
    price,
    category,
    image,
    description,
    rating,
  } = product;

  return (
    <div className="view-more">
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back to Products
      </button>

      <div className="product-details">
        <div className="product-image-box">
          <img src={image} alt={title} />
        </div>

        <div className="product-info">
          <p className="product-category">{category}</p>

          <h1>{title}</h1>

          <div className="product-rating">
            ⭐ {rating?.rate ?? "N/A"}
            {rating?.count != null &&
              ` (${rating.count} reviews)`}
          </div>

          <h2 className="product-price">
            ₹{Number(price).toFixed(2)}
          </h2>

          <p className="product-description">
            {description ||
              "No description available for this product."}
          </p>

          <div className="product-actions">
            <button
              type="button"
              className="add-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="delete"
              onClick={() => deleteProduct(id)}
            >
              Delete
            </button>

            <button
              type="button"
              className="go-cart-btn"
              onClick={() => navigate("/cart")}
            >
              <span className="go-cart-icon">🛒</span>
              <span>Go to Cart</span>
              <span className="go-cart-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewmore;
