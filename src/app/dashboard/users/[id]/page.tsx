"use client";
import React, { Suspense, useEffect } from "react";

//import { useRouter } from "next/router";

import UserProfile from "@/components/user/UserProfile";
import { getUser } from "@/networking/endpoints/getUser";
import { useParams } from "next/navigation";

import { useBoundStore } from "@/store/store";
import { getUserOrders } from "@/networking/endpoints/users/getUserOrders";
import { getUserCart } from "@/networking/endpoints/users/getUserCart";

const Page = () => {
  const params = useParams<{ id: string }>();

  const userDetails = useBoundStore((state) => state.userDetails);
  const setUserDetails = useBoundStore((state) => state.setUserDetails);
  const setUserOrders = useBoundStore((state) => state.setUserOrders);
  const setUserCart = useBoundStore((state) => state.setUserCart);

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const result = await getUser(params.id);
        setUserDetails(result);
        if (result) {
          const userOrdersResult = await getUserOrders(result.id);
          const userCartResult = await getUserCart(result.id);

          setUserOrders(userOrdersResult.data);
          setUserCart(userCartResult.data);
        }

        if (!result) return;
        console.log({ result });
      } catch {}
    };
    handleGetUser();

    return () => {
      setUserDetails(null);
    };
  }, [params.id]);

  if (!userDetails) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userDetails={userDetails} />
    </Suspense>
  );
};

export default Page;
