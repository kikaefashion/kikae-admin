'use client'

import AllVendors from '@/components/Vendor/AllVendors';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'



const Page = () => {
     const router = useRouter();
      const status = useSearchParams().get("status");
        
return(
    <div>
   <div className=" py-6 rounded-3xl font-openSansRegular">
            <button
              onClick={() =>
                router.replace(
                  "/dashboard/vendors?type=vendors&&status=approved&&page=1"
                )
              }
              className={`${
                status == "approved"
                  ? "bg-kikaeBlue text-white"
                  : "#fff text-kikaeGray"
              } py-1.5 px-2.5  rounded-3xl`}
            >
              Approved
            </button>
            <button
              onClick={() =>
                router.replace(
                  "/dashboard/vendors?type=vendors&&status=pending&&page=1"
                )
              }
              className={`${
                status == "pending"
                  ? "bg-kikaeBlue text-white"
                  : "#fff text-kikaeGray"
              } py-1.5 px-2.5  rounded-3xl`}
            >
              Pending
            </button>
          </div>
        <AllVendors /> 
    </div>
   )
}

export default Page