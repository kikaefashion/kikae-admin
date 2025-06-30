import { ArrowBack } from "@/assets/ArrowBack";
import { mediaUrlPrefix } from "@/networking/apiUrl";
import { useBoundStore } from "@/store/store";
import { useRouter } from "next/navigation";
import React from "react";
//import { Trash, Minus, Plus } from "lucide-react";
/* 
const initialCart = [
  {
    id: 1,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long Sleeve T-shirts",
    price: 60000,
    quantity: 1,
    stock: true,
  },
  {
    id: 2,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long Sleeve T-shirts",
    price: 15000,
    quantity: 2,
    stock: true,
  },
  {
    id: 3,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long Sleeve T-shirts",
    price: 2500,
    quantity: 4,
    stock: true,
  },
  {
    id: 4,
    image:
      "https://portal.nbaunitybar.org/tailor-api/storage/app/profile-pic/wCmgY7UuF3m2aZCPrX4uPuL3yaqkLRM0GhD9FaEn.jpg",
    name: "Long Sleeve T-shirts",
    price: 60000,
    quantity: 1,
    stock: true,
  },
]; */

const Cart = () => {
  //const [cart, setCart] = useState(initialCart);

  const cart = useBoundStore((state) => state.userCart);

  const router = useRouter();
  return (
    <div className="p-6 text-black">
      <div>
        <button
          onClick={() => router.back()}
          className="flex flex-row items-center gap-6 mb-4"
        >
          <ArrowBack /> <h2 className="text-xl font-semibold">Cart</h2>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cart?.length !== 0 &&
          cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-3xl flex flex-col"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={mediaUrlPrefix + item.product.media[0].url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-xs text-blue-500 font-semibold">
                    IN STOCK
                  </p>
                  <h3 className="text-sm">{item.product.name}</h3>
                  <p className="text-gray-700 font-semibold">
                    ₦{item.product.price * item.units}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  //   onClick={() => removeItem(item.id)}
                  className="text-gray-500 hover:text-red-500"
                >
                  {/*    <Trash size={18} /> */}
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    //  onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded-lg"
                  >
                    {/*  <Minus size={14} /> */}
                  </button>
                  <span className="w-6 text-center">{item.units}</span>
                  <button
                    //   onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    {/*    <Plus size={14} /> */}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
