"use client";
import store from "./_redux/store";
import React from "react";
import { Provider } from "react-redux";

const ParentComponent = ({ children }) => {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default ParentComponent;
