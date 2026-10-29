import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryDetails = {
    "men's clothing": {
      icon: "👔",
      description: "Upgrade your everyday style",
      number: "01",
    },
    "women's clothing": {
      icon: "👗",
      description: "Discover your signature look",
      number: "02",
    },
    jewelery: {
      icon: "💎",
      description: "The perfect finishing touch",
      number: "03",
    },
    electronics: {
      icon: "💻",
      description: "Technology for modern living",
      number: "04",
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/products"
        );

        const uniqueCategories = [
          ...new Set(
            response.data.map((product) => product.category)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Unable to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const openCategory = (category) => {
    navigate(
      `/adminportal/Products?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <main className="nc-category-page">
      <section className="nc-category-hero">
        <span className="nc-category-eyebrow">
          THE NAMMACART COLLECTION
        </span>

        <h1>
          Find Your <span>Style.</span>
        </h1>

        <p>
          Thoughtfully picked collections for every part of your life.
        </p>

        <div className="nc-category-divider">
          <span />
          <span />
          <span />
        </div>
      </section>

      {loading ? (
        <div className="nc-category-message">
          Loading collections...
        </div>
      ) : categories.length === 0 ? (
        <div className="nc-category-message">
          No categories available right now.
        </div>
      ) : (
        <section className="nc-category-grid">
          {categories.map((category, index) => {
            const details = categoryDetails[
              category.toLowerCase()
            ] || {
              icon: "🛍️",
              description: "Explore our latest collection",
              number: String(index + 1).padStart(2, "0"),
            };

            return (
              <article
                className="nc-category-card"
                key={category}
                onClick={() => openCategory(category)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openCategory(category);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="nc-category-card-top">
                  <span className="nc-category-number">
                    COLLECTION {details.number}
                  </span>
                  <span className="nc-category-arrow">↗</span>
                </div>

                <div className="nc-category-icon">
                  {details.icon}
                </div>

                <div className="nc-category-card-bottom">
                  <h2>{category}</h2>
                  <p>{details.description}</p>
                  <div className="nc-category-line" />
                  <span className="nc-category-cta">
                    EXPLORE COLLECTION
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <footer className="nc-category-footer">
        <span>GOOD FINDS. GREAT PRICES.</span>
        <span>YOUR WORLD, YOUR NAMMACART.</span>
      </footer>
    </main>
  );
};

export default Categories;
