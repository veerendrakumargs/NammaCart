
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/products"
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Display a promotional price for presentation.
  // Replace this with actual discount data when available.
  const getDiscount = (product) => {
    const id = Number(product.id) || 1;
    return 10 + ((id * 7) % 31);
  };

  const getOriginalPrice = (price, discount) => {
    return Number(price) / (1 - discount / 100);
  };

  const openProduct = (id) => {
    navigate(`/adminportal/viewmore/${id}`);
  };

  return (
    <main className="nc-deals-page">
      <section className="nc-deals-hero">
        <div className="nc-deals-hero-content">
          <span className="nc-deals-eyebrow">
            THE NAMMACART SALE EVENT
          </span>

          <h1>
            Great Deals.
            <br />
            <span>Greater Savings.</span>
          </h1>

          <p>
            Discover your favourites at prices worth celebrating.
          </p>

          <div className="nc-deals-badge">
            SPECIAL PICKS <span>✦</span> LIMITED-TIME OFFERS
          </div>

          <button
            className="nc-deals-shop-btn"
            onClick={() =>
              document
                .getElementById("nc-deals-list")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            EXPLORE DEALS <span>→</span>
          </button>
        </div>

        <div className="nc-deals-hero-art" aria-hidden="true">
          <div className="nc-deals-circle">
            <span className="nc-deals-percent">%</span>
            <span className="nc-deals-off">OFF</span>
          </div>
          <span className="nc-deals-spark nc-spark-one">✦</span>
          <span className="nc-deals-spark nc-spark-two">✧</span>
          <span className="nc-deals-spark nc-spark-three">✦</span>
        </div>
      </section>

      <section className="nc-deals-intro">
        <div>
          <span className="nc-deals-section-label">
            HANDPICKED FOR YOU
          </span>
          <h2>Deals worth discovering</h2>
          <p>Browse products from across our collections.</p>
        </div>

        <span className="nc-deals-count">
          {products.length} PRODUCTS
        </span>
      </section>

      <section className="nc-deals-list" id="nc-deals-list">
        {loading ? (
          <div className="nc-deals-message">Loading deals...</div>
        ) : products.length === 0 ? (
          <div className="nc-deals-message">
            No products available right now.
          </div>
        ) : (
          <div className="nc-deals-grid">
            {products.map((product) => {
              const discount = getDiscount(product);
              const originalPrice = getOriginalPrice(
                product.price,
                discount
              );

              return (
                <article className="nc-deal-card" key={product.id}>
                  <div className="nc-deal-image-wrap">
                    <span className="nc-deal-discount">
                      {discount}% OFF
                    </span>

                    <img
                      className="nc-deal-image"
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                    />

                    <button
                      className="nc-deal-view"
                      onClick={() => openProduct(product.id)}
                    >
                      VIEW PRODUCT ↗
                    </button>
                  </div>

                  <div className="nc-deal-info">
                    <span className="nc-deal-category">
                      {product.category}
                    </span>

                    <h3 title={product.title}>{product.title}</h3>

                    <div className="nc-deal-rating">
                      <span>★</span>{" "}
                      {product.rating?.rate ?? "N/A"}
                      <span className="nc-deal-review-count">
                        ({product.rating?.count ?? 0} reviews)
                      </span>
                    </div>

                    <div className="nc-deal-prices">
                      <span className="nc-deal-sale-price">
                        ₹{Number(product.price).toFixed(2)}
                      </span>

                      <span className="nc-deal-original-price">
                        ₹{originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="nc-deal-savings">
                      You save ₹
                      {(originalPrice - Number(product.price)).toFixed(2)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="nc-deals-footer">
        <span>SMART SHOPPING STARTS HERE.</span>
        <span>NAMMACART · GOOD FINDS, GREAT PRICES.</span>
      </footer>
    </main>
  );
};

export default Deals;
