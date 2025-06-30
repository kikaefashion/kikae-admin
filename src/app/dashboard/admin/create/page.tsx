"use client";
import { ArrowBack } from "@/assets/ArrowBack";
import Loader from "@/components/Loader";
import { handleRegisterAdmin } from "@/networking/endpoints/register";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAdminUser() {
  const [name, setName] = useState("");
  //const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [selectedRole, setSelectedRole] = useState("Vendor admin");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /*   const roles = [
    "Sub admin",
    "Vendor admin",
    "Finance admin",
    "Logistics admin",
    "Marketing admin",
    "Support admin",
  ]; */

  const createAdmin = async () => {
    setIsLoading(true);
    const result = await handleRegisterAdmin(email, password, password, name);
    setIsLoading(false);
    console.log({ result });
  };

  return (
    <div className="p-6 space-y-6 text-black">
      <div className="flex justify-between items-center">
        {" "}
        <div className="flex gap-6 items-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-12 h-12 p-3 bg-white rounded-3xl border border-black/25 justify-center items-center flex overflow-hidden"
          >
            <ArrowBack />
          </button>
          <h2 className="font-semibold text-xl">Create an admin user</h2>
        </div>
        <button
          onClick={createAdmin}
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          {isLoading ? <Loader /> : "Create admin user"}
        </button>
      </div>

      <div className="p-6 bg-white rounded-xl shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {/*  <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-2 rounded"
          /> */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/*     <div>
          <p className="font-medium mb-2">Select a role for this user:</p>
          <div className="flex flex-wrap gap-4">
            {roles.map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                />
                <span
                  className={
                    selectedRole === role
                      ? "text-blue-600 font-medium"
                      : "text-gray-700"
                  }
                >
                  {role}
                </span>
              </label>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
