
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">🛒</div>

        <p className="not-found-label">OOPS! PAGE NOT FOUND</p>

        <h1 className="not-found-code">404</h1>

        <h2>Looks like you're lost!</h2>

        <p className="not-found-message">
          The page you're looking for doesn't exist, may have
          been moved, or is temporarily unavailable.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-home">
            🏠 Go Home
          </Link>

          <button
            className="not-found-back"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>

        <div className="not-found-footer">
          <span>🛍️</span> Don't worry, there's more to shop!
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
