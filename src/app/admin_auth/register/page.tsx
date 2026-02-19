"use client";

import Loader from "@/components/Loader";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = () => {
    (async () => {
      try {
        setIsLoading(true);

        router.push("/");

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast("an error occurred try again", {
          autoClose: 5000,
        });

        setIsLoading(false);
      }
    })();
  };

  console.log(watch("password")); // watch input value by passing the name of it
  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      <p className="text-black opacity-50 mt-6"> To access Kikae Dashboard</p>
      <h1 className="text-black text-2xl"> Create an account</h1>
      <form
        className="bg-white flex flex-col w-494 border border-slate-200 pt-10 px-6 rounded-3xl mt-6 min-h-[23.8125rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}

        <div className="flex justify-between">
          <input
            className="rounded-3xl bg-lightWhite py-2.5 px-3.5 mb-10 text-black"
            // defaultValue="test"
            placeholder="first name"
            {...register("firstname")}
          />
          <input
            className="rounded-3xl bg-lightWhite py-2.5 px-3.5 mb-10 text-black"
            // defaultValue="test"
            placeholder="last name"
            {...register("lastname")}
          />
        </div>

        <input
          className="rounded-3xl bg-lightWhite py-2.5 px-3.5 mb-10 text-black"
          // defaultValue="test"
          placeholder="email"
          {...register("email")}
        />

        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="password"
          className="bg-lightWhite py-2.5 px-3.5 rounded-3xl mb-6 text-black"
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <button
          disabled={isLoading}
          className="bg-kikaeBlue  rounded-4xl p-2.5 mx-auto mt-6 justify-center w-[10.375rem]"
        >
          {isLoading ? <Loader /> : "Create an account"}
        </button>
      </form>
      <p className="text-center text-black mt-6">
        Already have an account?{" "}
        <Link href={"/"} className="text-kikaeBlue ">
          Login{" "}
        </Link>
      </p>
    </div>
  );
};

export default Register;
