import React from "react";

import ArrowBack from "../ArrowBack";

const LogisticsNav = ({
  name,
  handleDeleteLogistic,
}: {
  name: string;
  handleDeleteLogistic: () => void;
}) => {
  return (
    <nav className="flex items-center justify-between p-4 ">
      <div className="flex items-center gap-2">
        <ArrowBack />
        <h1 className="text-lg font-semibold text-black">{name}</h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDeleteLogistic}
          className="text-black underline font-bold"
        >
          Delete
        </button>
        {/* Add any additional navigation items here */}
      </div>
    </nav>
  );
};

export default LogisticsNav;
