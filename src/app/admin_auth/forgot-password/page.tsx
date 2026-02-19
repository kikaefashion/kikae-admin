"use client";

/* import { superAdminLogin } from "@/networking/superAdminLogin"; */

import Link from "next/link";
//import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import Loader from "@/components/Loader";
import { toast } from "react-toastify";

import Cookies from "universal-cookie";
//import { adminLogin } from "@/networking/endpoints/adminLogin";
import { forgotPassword } from "@/networking/endpoints/forgotPassword";

type FormData = {
  email: string;
  //password: string;
};

const Login = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  const adminID = cookies.get("adminID");
  const adminRole = cookies.get("adminRole");

  console.log({ authToken, adminID, adminRole });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    (async () => {
      try {
        setIsLoading(true);

        const result = await forgotPassword(data.email);

        if (!result) return setIsLoading(false);

        //router.push("/dashboard/overview");

        setIsLoading(false);
      } catch (error) {
        toast("an error occurred try again", {
          autoClose: 5000,
        });
        console.log(error);
        setIsLoading(false);
      }
    })();
  };

  // console.log(watch("password")); // watch input value by passing the name of it

  return (
    <div className="flex flex-col  items-center h-screen justify-center">
      {/*       <CatchMe /> */}

      <p className="text-black opacity-50 mt-6"> To reset your password</p>
      <h1 className="text-black text-2xl font-bold">Enter your email</h1>
      <form
        className="bg-white flex flex-col w-494 border border-slate-200 p-[3rem]  rounded-3xl mt-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black"
          // defaultValue="test"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.email && (
          <span className="text-black px-6">Email is required</span>
        )}

        {/*       <input type="submit" value={"Login"} /> */}
        <button
          disabled={isLoading}
          className="bg-kikaeBlue w-36 rounded-4xl p-2.5 mx-auto mt-6 text-white justify-center"
        >
          {isLoading ? <Loader /> : "Proceed"}
        </button>
      </form>
      <Link href={"/"} className="text-kikaeBlue text-right">
        Back to login
      </Link>
      <div className="flex flex-row justify-between items-center"></div>
    </div>
  );
};

export default Login;
