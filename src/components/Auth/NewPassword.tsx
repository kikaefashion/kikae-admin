"use client";
import CatchMe from "@/assets/CatchMe";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  password: string;
  confirmPassword: string;
};

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  console.log(watch("password")); // watch input value by passing the name of it
  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      <CatchMe />
      <p className="text-black opacity-50 mt-6"> To access your account</p>
      <h1 className="text-black text-2xl"> Enter a new password</h1>
      <form
        className="bg-white flex flex-col w-494 border border-slate-200 pt-10 px-6 rounded-3xl mt-6 min-h-[18.93rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black"
          // defaultValue="test"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && (
          <span className="text-black px-6">field is required</span>
        )}

        {/* include validation with required or other standard HTML validation rules */}

        <input
          className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black mt-6"
          // defaultValue="test"
          placeholder="confirm Password"
          {...register("confirmPassword", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && (
          <span className="text-black px-6">field is required</span>
        )}

        <input
          className="bg-red-500 rounded-4xl p-2.5 mx-auto mt-10 w-[14.94rem]"
          type="submit"
          value={"set new password"}
        />
      </form>

      <Link href={"/"} className="text-red-500 mt-6">
        Back to Login{" "}
      </Link>
    </div>
  );
};

export default NewPassword;
