"use client";

import { useEffect, useState } from "react";

const CartNotification = ({ show, productName, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`cart-notification ${isVisible ? "show" : "hide"}`}>
      <div className="notification-content">
        <div className="notification-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="notification-text">
          <p className="notification-title">¡Producto agregado!</p>
          <p className="notification-product">{productName}</p>
        </div>
      </div>
    </div>
  );
};

export default CartNotification;
