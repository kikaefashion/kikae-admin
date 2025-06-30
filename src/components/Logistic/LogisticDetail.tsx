interface LogisticsProvider {
  name: string;
  deliveringFrom: string;
  deliveringTo: string;
  citiesCovered: string[];
  baseFee: string;
  whatsappNumber: string;
  contactNumber: string;
  email: string;
}

const logisticsProvider: LogisticsProvider = {
  name: "Speed X Logistics",
  deliveringFrom: "Lagos",
  deliveringTo: "Lagos",
  citiesCovered: ["Ikorodu", "Epe", "Ikeja"],
  baseFee: "2,500",
  whatsappNumber: "+234 495 3859 294",
  contactNumber: "+234 495 3859 294",
  email: "info@speedxlogistics.com",
};

export default function LogisticsProviderDetails() {
  return (
    <div className="p-6">
      <div className=" p-6 bg-white rounded-lg shadow-lg text-black">
        <table className="w-full ">
          <thead className="text-kikaeBlue">
            <tr>
              <th className="p-2 text-left">First Name</th>
              <th className="p-2 text-left">Delivering from</th>
              <th className="p-2 text-left">Delivering to</th>
              <th className="p-2 text-left">Cities covered</th>
              <th className="p-2 text-left">Base Fee (₦)</th>
              <th className="p-2 text-left">Company email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">{logisticsProvider.name}</td>
              <td className="p-2">{logisticsProvider.deliveringFrom}</td>
              <td className="p-2">{logisticsProvider.deliveringTo}</td>
              <td className="p-2">
                {logisticsProvider.citiesCovered.join(", ")}
              </td>
              <td className="p-2">{logisticsProvider.baseFee}</td>
              <td className="p-2">{logisticsProvider.email}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center mt-4 gap-6">
          <div className="">
            <p className="font-medium text-blue-500">WhatsApp Number</p>
            <p>{logisticsProvider.whatsappNumber}</p>
          </div>
          <div className="">
            <p className="font-medium text-blue-500">Company Contact Number</p>
            <p>{logisticsProvider.contactNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
