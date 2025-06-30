"use client";

import { useBoundStore } from "@/store/store";
import React from "react";

import { ArrowBack } from "@/assets/ArrowBack";

const IncreaseLimitModal = () => {
  const IncreaseLimitModal = useBoundStore(
    (state) => state.isIncreaseLimitModalVisible
  );
  const setIncreaseLimitModal = useBoundStore(
    (state) => state.setIsIncreaseLimitModalVisible
  );
  const [limit, setLimit] = React.useState(0);

  //const userId = useBoundStore((state) => state.deleteUserId);

  //console.log({ userId });
  return (
    <div
      className={`fixed z-50 inset-0 flex justify-center items-center bg-[#000000] bg-opacity-50 ${
        IncreaseLimitModal ? "block" : "hidden"
      }`}
    >
      <div className="w-[430px] h-[286px] px-[39px] pt-[72px] pb-[71px] bg-white rounded-3xl justify-center items-center inline-flex overflow-hidden">
        <div className="w-[352px] flex-col justify-start items-center gap-[39px] inline-flex">
          <div className="relative w-full  items-center">
            <button
              className="absolute top-2 left-0"
              onClick={() => setIncreaseLimitModal(false)}
            >
              <ArrowBack />
            </button>
            <h4 className="self-stretch text-center text-black text-2xl font-bold font-['Raleway'] leading-9 ">
              Set super admin limit
            </h4>
          </div>

          <p className="self-stretch text-center text-black/50 text-base font-normal font-['DM Sans'] leading-[30px]">
            Set super admin limit Set a limit for the max number of super admins
            that can be created
          </p>
          <div className="justify-start items-center gap-10 inline-flex">
            {/*   <button
              onClick={() => setDisplayModal(false)}
              className="px-[52px] py-5 rounded-[32px] border border-[#ff0a54] justify-center items-center gap-2.5 flex text-[#ff0a54] text-base font-normal font-['DM Sans']"
            >
              No
            </button> */}
            <div>
              <input
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                type="number"
                placeholder="eg 5"
                className=" px-[10px] py-5 bg-lightWhite rounded-[32px] text-black text-base font-normal font-['DM Sans']"
              />
              <p className="text-black/50 text-xs font-normal font-['DM Sans'] leading-[18px]">
                {" "}
                Specify limit here{" "}
              </p>
            </div>
            <button className="px-[52px] py-5 bg-[#ff0a54] rounded-[32px] justify-center items-center gap-2.5 flex text-white text-base font-normal font-['DM Sans']">
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncreaseLimitModal;
