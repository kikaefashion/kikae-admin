"use client";

import CatchMe from "@/assets/CatchMe";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

type FormData = {
  from_name: string;
  email: string;
  message: string;
};

const Page = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>();

  const sendEmail = () => {
    if (form.current === null) return;
    emailjs
      .sendForm("service_weie647", "template_auwn9pl", form.current, {
        publicKey: "bWVVYdxTEetSdjn0t",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast("Message sent successfully", {
            autoClose: 5000,
          });
          if (form.current) {
            form.current.reset();
          }
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast("An error occurred, try again", {
            autoClose: 5000,
          });
        }
      );
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    sendEmail();
  };
  return (
    <div className="flex flex-col  items-center  px-6 py-6">
      <CatchMe />

      <div className="py-6">
        <h1 className="text-black text-2xl text-center mb-4">
          {" "}
          Request Support{" "}
        </h1>
        <p className="text-black  ">
          {" "}
          Have a question or need help with something? We are here to help.
        </p>{" "}
        <p className="text-black opacity-50 ">
          Please provide your name, email and a message to help us understand
          your request
        </p>
        <form
          ref={form}
          className=" flex flex-col  pt-4 px-6 rounded-3xl mt-6 mb-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* register your input into the hook by invoking the "register" function */}

          <div className="  sm:flex-row flex gap-4 sm:justify-between flex-col mb-10">
            <div className="flex flex-col">
              <input
                className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black bg-white border border-slate-200"
                // defaultValue="test"
                placeholder="name"
                {...register("from_name", { required: true })}
              />
              {errors.from_name && (
                <p className="text-black">This field is required</p>
              )}
            </div>

            <div className="flex flex-col mb-10">
              <input
                className="rounded-3xl bg-lightWhite py-2.5 px-3.5  text-black bg-white border border-slate-200"
                // defaultValue="test"
                placeholder="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-black">This field is required</p>
              )}
            </div>
          </div>

          {/* include validation with required or other standard HTML validation rules */}
          <textarea
            placeholder="message"
            className="bg-lightWhite py-2.5 px-3.5 rounded-3xl mb-6 text-black bg-white border border-slate-200 h-[8.125rem]"
            {...register("message", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.message && (
            <p className="text-black">This field is required</p>
          )}

          <input
            className="bg-red-500 w-full rounded-4xl p-2.5 mx-auto mt-6"
            type="submit"
            value={"Send Message"}
          />
        </form>
        <p className="text-black">
          You can also reach us at{" "}
          <a href="mailto:support@thecatchmeapp.co" className="text-red-500">
            CatchMeApp Support{" "}
          </a>{" "}
          or{" "}
          <a href="mailto:info@thecatchmeapp.co" className="text-red-500">
            CatchMeApp info{" "}
          </a>
        </p>
      </div>
      {/*      <Footer /> */}
    </div>
  );
};

export default Page;
