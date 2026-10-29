import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">WELCOME TO NAMMACART</span>

          <h1>
            Shopping Made <br />
            <span>Simple & Special.</span>
          </h1>

          <p>
            Discover amazing products, exciting deals, and everyday
            essentials — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/Products" className="shop-btn">
              Shop Now <span>→</span>
            </Link>

            <Link to="/Categories" className="explore-btn">
              Explore Categories
            </Link>
          </div>

          <div className="hero-features">
            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>Best</strong>
              <span>Deals</span>
            </div>
            <div>
              <strong>Easy</strong>
              <span>Shopping</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>
          <div className="hero-emoji">🛍️</div>
          <div className="floating-card floating-card-one">
            <span>✨</span>
            <div>
              <strong>Great Deals</strong>
              <small>Everyday savings</small>
            </div>
          </div>
          <div className="floating-card floating-card-two">
            <span>🛒</span>
            <div>
              <strong>Your Next Favourite</strong>
              <small>Just a click away</small>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE OUR STORE</span>
            <h2>Shop by Category</h2>
          </div>
          <Link to="/Categories">View all →</Link>
        </div>

        <div className="category-grid">
          <Link to="/Categories" className="category-card">
            <span>🎧</span>
            <h3>Electronics</h3>
            <p>Tech for everyday life</p>
          </Link>

          <Link to="/Categories" className="category-card">
            <span>👕</span>
            <h3>Fashion</h3>
            <p>Find your own style</p>
          </Link>

          <Link to="/Categories" className="category-card">
            <span>🏠</span>
            <h3>Home & Living</h3>
            <p>Make yourself at home</p>
          </Link>

          <Link to="/Categories" className="category-card">
            <span>💄</span>
            <h3>Beauty</h3>
            <p>Your daily essentials</p>
          </Link>
        </div>
      </section>

      {/* Deals Banner */}
      <section className="deal-banner">
        <div>
          <span className="section-label">DON'T MISS OUT</span>
          <h2>Something Special Is Waiting.</h2>
          <p>Explore our latest products and find something you love.</p>
        </div>

        <Link to="/Deals" className="shop-btn">
          Explore Deals →
        </Link>
      </section>

      {/* Why NammaCart */}
      <section className="home-section benefits-section">
        <div className="section-heading">
          <div>
            <span className="section-label">THE NAMMACART EXPERIENCE</span>
            <h2>Why Shop With Us?</h2>
          </div>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <span>💎</span>
            <h3>Quality Choices</h3>
            <p>Explore products for your everyday needs.</p>
          </div>

          <div className="benefit-card">
            <span>💰</span>
            <h3>Value for Money</h3>
            <p>Discover products at prices you'll love.</p>
          </div>

          <div className="benefit-card">
            <span>🛍️</span>
            <h3>Easy Shopping</h3>
            <p>Find your favourites in just a few clicks.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <h2>Namma<span>Cart</span></h2>
        <p>Your shopping journey starts here.</p>
        <small>© {new Date().getFullYear()} NammaCart. All rights reserved.</small>
      </footer>

    </div>
  );
};

export default Home;
