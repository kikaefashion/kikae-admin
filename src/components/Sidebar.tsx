"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { dm_sans } from "@/app/ui/fonts";

import Logout from "@/assets/Logout";

const sidebarContents = [
  {
    title: "overview",
    icon: "",
    link: "/overview",
  },
  {
    title: "users",
    icon: "",
    link: "/users?type=buyers&&page=1",
  },
  {
    title: "products",
    icon: "",
    link: "/products?type=items&&status=approved&&page=1",
  },
  {
    title: "orders",
    icon: "",
    link: "/orders",
  },
  {
    title: "notifications",
    icon: "",
    link: "/notifications",
  },
  {
    title: "logistics",
    icon: "",
    link: "/logistics",
  },

  {
    title: "runway videos",
    icon: "",
    link: "/runway",
  },
  {
    title: "categories",
    icon: "",
    link: "/categories",
  },
  {
    title: "deactivated vendors",
    icon: "",
    link: "/deactivated_vendors",
  },

  {
    title: "admin",
    icon: "",
    link: "/admin/profile",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div>
      <div className=" justify-between">
        {sidebarContents.map((content) => (
          <Link
            key={content.title}
            className={`${
              dm_sans.className
            } capitalize text-black text-base font-bold font-['DM Sans'] leading-[30px] flex flex-col p-30 ${
              pathname == "/dashboard" + content.link
                ? "text-kikaeBlue"
                : "text-black"
            } text-lg `}
            href={`/dashboard${content.link}`}
          >
            {content.title}
          </Link>
        ))}
      </div>
      <div className="flex justify-center py-2.5">
        <Logout />{" "}
        <Link
          //onClick={logout}
          href={"/"}
          className="text-slate-400 text-right ml-6"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
