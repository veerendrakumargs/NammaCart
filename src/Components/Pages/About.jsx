
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const About = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: "✦",
      number: "01",
      title: "Quality First",
      description:
        "Products selected with care to make every purchase worthwhile.",
    },
    {
      icon: "◇",
      number: "02",
      title: "Value for Money",
      description:
        "Discover useful products and great value across our collections.",
    },
    {
      icon: "♡",
      number: "03",
      title: "Customer Focused",
      description:
        "A shopping experience designed around your needs and convenience.",
    },
    {
      icon: "↗",
      number: "04",
      title: "Easy Discovery",
      description:
        "Explore categories and find products for your everyday life.",
    },
  ];

  return (
    <main className="nc-about-page">
      {/* Hero */}
      <section className="nc-about-hero">
        <div className="nc-about-hero-content">
          <span className="nc-about-eyebrow">
            GET TO KNOW US
          </span>

          <h1>
            Shopping made
            <br />
            <span>more meaningful.</span>
          </h1>

          <p>
            Welcome to NammaCart — your place to discover
            products for everyday living, personal style,
            and everything in between.
          </p>

          <button
            className="nc-about-button"
            onClick={() => navigate("/adminportal/Products")}
          >
            EXPLORE PRODUCTS <span>→</span>
          </button>
        </div>

        <div className="nc-about-hero-art" aria-hidden="true">
          <div className="nc-about-art-circle">
            <span className="nc-about-art-symbol">N</span>
            <span className="nc-about-art-name">NAMMACART</span>
            <span className="nc-about-art-line" />
            <span className="nc-about-art-tagline">
              YOUR WORLD. YOUR CART.
            </span>
          </div>
          <span className="nc-about-star nc-about-star-one">✦</span>
          <span className="nc-about-star nc-about-star-two">✧</span>
        </div>
      </section>

      {/* Our Story */}
      <section className="nc-about-story">
        <div className="nc-about-story-label">
          <span className="nc-about-section-number">01</span>
          <span>OUR STORY</span>
        </div>

        <div className="nc-about-story-content">
          <h2>
            A simpler way
            <br />
            to <span>find what you love.</span>
          </h2>

          <p>
            NammaCart is built around a simple idea: online
            shopping should feel straightforward, convenient,
            and enjoyable. We bring products from different
            categories together in one place, helping you
            explore your options with ease.
          </p>

          <p>
            From everyday essentials to personal favourites,
            our goal is to make product discovery easier and
            give every shopper a welcoming place to browse.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="nc-about-values">
        <div className="nc-about-values-heading">
          <span className="nc-about-eyebrow">
            THE NAMMACART DIFFERENCE
          </span>
          <h2>What matters to us</h2>
          <p>
            The principles behind the experience we're building.
          </p>
        </div>

        <div className="nc-about-values-grid">
          {benefits.map((benefit) => (
            <article className="nc-about-value-card" key={benefit.number}>
              <div className="nc-about-value-top">
                <span className="nc-about-value-icon">
                  {benefit.icon}
                </span>
                <span className="nc-about-value-number">
                  {benefit.number}
                </span>
              </div>

              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>

              <div className="nc-about-value-line" />
            </article>
          ))}
        </div>
      </section>

      {/* Closing banner */}
      <section className="nc-about-cta">
        <span className="nc-about-eyebrow">
          YOUR NEXT FIND IS WAITING
        </span>

        <h2>
          Discover more.
          <span> Shop your way.</span>
        </h2>

        <p>
          Explore our collections and find something you'll love.
        </p>

        <button
          className="nc-about-button nc-about-button-light"
          onClick={() => navigate("/adminportal/Products")}
        >
          START EXPLORING <span>→</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="nc-about-footer">
        <span>NAMMACART</span>
        <span>GOOD FINDS. GREAT PRICES.</span>
      </footer>
    </main>
  );
};

export default About;
