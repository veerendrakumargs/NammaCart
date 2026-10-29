import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const CART_KEY = "nammaCart";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items
        .map((item) => {
          if (String(item.id) !== String(id)) return item;

          return {
            ...item,
            quantity: Math.max(
              1,
              Number(item.quantity || 1) + change
            ),
          };
        })
    );
    setCheckoutMessage("");
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter((item) => String(item.id) !== String(id))
    );
    setCheckoutMessage("");
  };

  const clearCart = () => {
    setCartItems([]);
    setCheckoutMessage("");
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const proceedToCheckout = () => {
    setCheckoutMessage(
      "Your cart is ready! Connect a checkout page to complete your order."
    );
  };

  return (
    <main className="nc-cart-page">
      <section className="nc-cart-header">
        <span className="nc-cart-eyebrow">YOUR NAMMACART</span>
        <h1>
          Shopping <span>Cart.</span>
        </h1>
        <p>Review your picks before you make them yours.</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="nc-cart-empty">
          <div className="nc-cart-empty-icon">🛍️</div>
          <h2>Your cart is waiting for something special.</h2>
          <p>
            You haven't added any products yet. Explore our
            collection and find something you love.
          </p>

          <button
            className="nc-cart-primary-btn"
            onClick={() => navigate("/users/Products")}
          >
            EXPLORE PRODUCTS <span>→</span>
          </button>
        </section>
      ) : (
        <section className="nc-cart-layout">
          <div className="nc-cart-items-section">
            <div className="nc-cart-list-header">
              <h2>Your Items ({totalQuantity})</h2>

              <button
                className="nc-cart-clear-btn"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>

            <div className="nc-cart-items">
              {cartItems.map((item) => (
                <article className="nc-cart-item" key={item.id}>
                  <button
                    className="nc-cart-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                    title="Remove item"
                  >
                    ×
                  </button>

                  <div
                    className="nc-cart-product-image"
                    onClick={() =>
                      navigate(`/users/Viewmore/${item.id}`)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        navigate(`/users/Viewmore/${item.id}`);
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className="nc-cart-product-info">
                    <span className="nc-cart-category">
                      {item.category || "COLLECTION"}
                    </span>

                    <h3>{item.title || "Product"}</h3>

                    <span className="nc-cart-unit-price">
                      {formatPrice(item.price)} each
                    </span>

                    <div className="nc-cart-quantity">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={Number(item.quantity || 1) <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{Number(item.quantity || 1)}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="nc-cart-item-total">
                    {formatPrice(
                      Number(item.price || 0) *
                        Number(item.quantity || 1)
                    )}
                  </div>
                </article>
              ))}
            </div>

            <button
              className="nc-cart-continue-btn"
              onClick={() => navigate("/users/Products")}
            >
              ← Continue shopping
            </button>
          </div>

          <aside className="nc-cart-summary">
            <span className="nc-cart-summary-eyebrow">
              ORDER OVERVIEW
            </span>

            <h2>Order Summary</h2>

            <div className="nc-cart-summary-row">
              <span>Items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="nc-cart-summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="nc-cart-summary-row">
              <span>Shipping</span>
              <span className="nc-cart-free">Calculated at checkout</span>
            </div>

            <div className="nc-cart-summary-divider" />

            <div className="nc-cart-total-row">
              <span>Estimated subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p className="nc-cart-tax-note">
              Shipping charges and applicable taxes may be added
              during checkout.
            </p>

            <button
              className="nc-cart-checkout-btn"
              onClick={proceedToCheckout}
            >
              PROCEED TO CHECKOUT <span>→</span>
            </button>

            {checkoutMessage && (
              <p className="nc-cart-checkout-message" role="status">
                {checkoutMessage}
              </p>
            )}

            <div className="nc-cart-summary-footer">
              <span>✦</span>
              Thank you for shopping with NammaCart.
            </div>
          </aside>
        </section>
      )}

      <footer className="nc-cart-footer">
        <span>NAMMACART</span>
        <span>GOOD FINDS. GREAT PRICES.</span>
      </footer>
    </main>
  );
};

export default Cart;
