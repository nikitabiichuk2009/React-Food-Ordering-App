import React, { createContext, useState, useRef } from "react";

export const ModalContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
  showSuccess: () => {},
  hideSuccess: () => {},
});

export default function ModalContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  const showCart = () => {
    console.log("cart")
    setUserProgress("cart");
  };

  const hideCart = () => {
    setUserProgress("");
  };

  const showCheckout = () => {
    console.log("checkout")
    setUserProgress("checkout");
  };

  const hideCheckout = () => {
    setUserProgress("");
    
  };
  const showSuccess = () => {
    setUserProgress("success");
  }
  const hideSuccess = () => {
    setUserProgress("");
  }

  const modalCtxValue = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
    showSuccess,
    hideSuccess,
  };

  return (
    <ModalContext.Provider value={modalCtxValue}>
      {children}
    </ModalContext.Provider>
  );
}
