"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const ToastComponent = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 7000);

    // Cleanup the timer if the component is unmounted
    return () => {
      clearTimeout(timer);
      setVisible(true);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="bg-green-500 absolute z-50 left-0 right-0">
      <ToastContainer
        autoClose={7000}
        className={"bg-red-500 text-white text-center"}
      />{" "}
    </div>
  );
};

export default ToastComponent;
