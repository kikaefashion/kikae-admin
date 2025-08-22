"use client";
import { ArrowBack } from "@/assets/ArrowBack";
import Loader from "@/components/Loader";
//import { assignAdminRole } from "@/networking/endpoints/assignAdminRole";
import { editAdmin } from "@/networking/endpoints/editAdmin/editAdmin";
import { getAdmin } from "@/networking/endpoints/getAdmin";
//import { AdminProfileType } from "@/types/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateAdminUser() {
  /*  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); */
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams<{ admin: string }>();

  const [admin, setAdmin] = useState<{
    name: string;
    email: string;
    //defaultPassword: "",
    admin_role: string;
    id: string;
    // isBlocked: false,
  }>({
    name: "",
    email: "",
    //defaultPassword: "",
    admin_role: "",
    id: "",
    // isBlocked: false,
  });

  const roles = [
    { name: "Super admin", role: "superadmin" },
    { name: "Sub admin", role: "subadmin" },
    { name: "Vendor admin", role: "vendoradmin" },
    { name: "Finance admin", role: "financeadmin" },
    { name: "Logistics admin", role: "logisticsadmin" },
    { name: "Marketing admin", role: "marketingadmin" },
    { name: "Support admin", role: "supportadmin" },
  ];

  const handleGetAdmin = async (id: string) => {
    try {
      const result = await getAdmin(id);

      if (!result) return;

      setAdmin(result.admins[0]);
    } catch {}
  };

  useEffect(() => {
    handleGetAdmin(params.admin);
  }, [params.admin]);

  //const handleGetAdmin = async () => {};

  /*  const handleAssignRole = async () => {
    setIsLoading(true);
    await assignAdminRole(params.admin, selectedRole);
    setIsLoading(false);
  }; */

  if (isLoading) {
    return <Loader />;
  }
  if (!admin) return null;
  const handleEditAdmin = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!admin?.name) {
      alert("name is Compulsory");
      return;
    }

    if (!admin.admin_role) {
      alert("role is compulsory");
      return;
    }
    setIsLoading(true);
    await editAdmin(params.admin, admin?.name, password, admin?.admin_role);
    setIsLoading(false);
    router.back();
  };
  //console.log({ admin });
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
          <h2 className="font-semibold text-xl">Edit an admin user</h2>
        </div>
        <button
          onClick={handleEditAdmin}
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          {isLoading ? <Loader /> : "Edit admin user"}
        </button>
      </div>

      <div className="p-6 bg-white rounded-xl shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={admin?.name}
            onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          {/*  <input
            type="email"
            placeholder="Email"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            className="w-full border p-2 rounded"
          /> */}
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

        <div>
          <p className="font-medium mb-2">Select a role for this user:</p>
          <div className="flex flex-wrap gap-4">
            {roles.map((role) => (
              <label key={role.name} className="flex items-center space-x-2">
                <input
                  // defaultValue={admin.admin_role}
                  type="radio"
                  name="role"
                  value={admin.admin_role}
                  checked={admin.admin_role === role.role}
                  onChange={() => {
                    //setAdmin({...admin, admin_role:role.role})
                    setAdmin({ ...admin, admin_role: role.role });
                  }}
                />
                <span
                  className={
                    admin.admin_role === role.role
                      ? "text-blue-600 font-medium"
                      : "text-gray-700"
                  }
                >
                  {role.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
