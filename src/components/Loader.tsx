import React from "react";
import { Watch } from "react-loader-spinner";
const Loader = () => {
  return (
    <Watch
      height="24"
      width="24"
      color="white"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        marginHorizontal: "auto",

        justifyContent: "center",
      }}
    />
  );
};

export default Loader;
