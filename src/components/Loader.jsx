import React from "react";

function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999]">
      <img className="loader block" src="/loading.gif" alt="loadergif" />
    </div>
  );
}

export default Loader;
