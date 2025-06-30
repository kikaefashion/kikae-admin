"use client";
import CatchMe from "@/assets/CatchMe";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  otp: string;
};

const OtpPassword = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      <CatchMe />
      <p className="text-black opacity-50 mt-6">
        {" "}
        Enter the 6-digit code sent to your email
      </p>
      <h1 className="text-black text-2xl"> Verify your email address</h1>
      <form
        className="bg-white flex flex-col w-494 border border-slate-200 pt-10 px-6 rounded-3xl mt-6 min-h-[14.0625rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black"
          // defaultValue="test"
          placeholder="email"
          {...register("otp", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.otp && (
          <span className="text-black px-6">Email is required</span>
        )}

        {/* include validation with required or other standard HTML validation rules */}

        <input
          className="bg-red-500 w-36 rounded-4xl p-2.5 mx-auto mt-6"
          type="submit"
          value={"Verify"}
        />
      </form>

      <Link href={"/"} className="text-red-500 ">
        Change email address{" "}
      </Link>
    </div>
  );
};

export default OtpPassword;
