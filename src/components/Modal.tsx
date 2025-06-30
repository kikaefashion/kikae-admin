"use client";

import { useBoundStore } from "@/store/store";
import React from "react";

const Modal = ({
  text,
}: //onPress,
{
  text: string;
  //display: boolean;
  //onPress: (btn: string) => void;
}) => {
  const displayModal = useBoundStore((state) => state.displayDeleteModal);
  const setDisplayModal = useBoundStore((state) => state.setDisplayDeleteModal);

  const userId = useBoundStore((state) => state.deleteUserId);

  console.log({ userId });
  return (
    <div
      className={`fixed z-50 inset-0 flex justify-center items-center bg-[#000000] bg-opacity-50 ${
        displayModal ? "block" : "hidden"
      }`}
    >
      <div className="w-[430px] h-[286px] px-[39px] pt-[72px] pb-[71px] bg-white rounded-3xl justify-center items-center inline-flex overflow-hidden">
        <div className="w-[352px] flex-col justify-start items-center gap-[39px] inline-flex">
          <div className="self-stretch text-center text-black text-2xl font-bold font-['Raleway'] leading-9">
            {text}
          </div>
          <div className="justify-start items-center gap-10 inline-flex">
            <button
              onClick={() => setDisplayModal(false)}
              className="px-[52px] py-5 rounded-[32px] border border-[#ff0a54] justify-center items-center gap-2.5 flex text-[#ff0a54] text-base font-normal font-['DM Sans']"
            >
              No
            </button>
            <button className="px-[52px] py-5 bg-[#ff0a54] rounded-[32px] justify-center items-center gap-2.5 flex text-white text-base font-normal font-['DM Sans']">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
