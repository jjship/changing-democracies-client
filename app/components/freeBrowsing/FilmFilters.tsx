"use client";

import React from "react";

const Filters: React.FC = () => {
  return (
    <div className="mb-4 flex space-x-2">
      <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Poland
      </button>
      <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Czech
      </button>
      <button className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Greece
      </button>
      {/* Add more filters as needed */}
    </div>
  );
};

export default Filters;
