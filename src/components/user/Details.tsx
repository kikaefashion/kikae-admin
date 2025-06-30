import { useSearchParams } from "next/navigation";
import React from "react";
import AddressCards from "./AddressCards";
import OrdersGrid from "./OrdersCards";
import FollowingGrid from "./FollowingsCard";
import Cart from "./Cart";
import OngoingDelivery from "./DeliveryCard";
import ReviewsComments from "./CommentCard";

const Details = () => {
  const search = useSearchParams().get("details");

  console.log({ search });

  if (search == "addresses") {
    return <AddressCards />;
  } else if (search == "orders") {
    return <OrdersGrid />;
  } else if (search == "following") {
    return <FollowingGrid />;
  } else if (search == "cart") {
    return <Cart />;
  } else if (search == "delivery") {
    return <OngoingDelivery />;
  } else if (search == "comments") {
    return <ReviewsComments />;
  }
  return null;
};

export default Details;
