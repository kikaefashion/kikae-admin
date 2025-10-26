import React from "react";

const TableSkeleton = () => {
  return (
    <div>
      {/* Loading state for orders table */}
      <div className="overflow-x-auto mt-6">
        <div className="bg-white rounded-3xl p-4 animate-pulse">
          <div className="space-y-3">
            <div className="grid grid-cols-11 gap-4">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-11 gap-4">
                {[...Array(11)].map((_, j) => (
                  <div key={j} className="h-3 bg-gray-100 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
