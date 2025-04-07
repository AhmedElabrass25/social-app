import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 bg-black/40 z-[50]">
      <span className="loader"></span>
    </div>
  );
};

export default Loading;
