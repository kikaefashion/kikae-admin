import { mediaUrlPrefix } from "@/networking/apiUrl";
//import { getStoreProducts } from "@/networking/endpoints/vendors/getStoreProduct";
import { productData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const VendorProducts = ({
  storeProducts,
}: {
  storeProducts: productData[];
}) => {
  //const [storeProducts, setStoreProducts] = useState<productData[]>();
  //  const params = useParams<{ id: string }>();
  const router = useRouter();

  /*   useEffect(() => {
 
  }, [params.id]);
 */
  if (!storeProducts || storeProducts.length == 0) {
    return <h4>No Product has been uploaded to this store</h4>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 mt-6 ">
      {storeProducts.map((product) => (
        <div
          key={product.id}
          onClick={() => router.push("/dashboard/products/1")}
          className="rounded-3xl relative cursor-pointer "
        >
          <Image
            src={mediaUrlPrefix + product.media[0].url}
            alt={product.name}
            width={183}
            height={204}
            className="rounded-3xl w-[183px] h-[204px] h-40 object-cover"
          />
          <h2 className="text-base font-openSansRegular mt-2 text-black">
            {product.name}
          </h2>
          <p className="text-kikaeGrey font-openSansRegular">{product.price}</p>
          <p className="text-white bg-black/50 absolute top-3.5 left-3.5 px-1 py-1 rounded-2xl">
            ⭐ {product.rating}
          </p>
        </div>
      ))}
    </div>
  );
};

export default VendorProducts;
