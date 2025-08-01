"use client";
import Loader from "@/components/Loader";
import { addLogistic } from "@/networking/endpoints/logistics/addLogistic";
import { useState } from "react";

/* interface City {
  name: string;
  fee: string;
} */

export default function AddLogisticsProvider({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /*   const [cities, setCities] = useState<City[]>([
    { name: "Ikeja", fee: "2500" },
    { name: "Ikorodu", fee: "3000" },
    { name: "Epe", fee: "3500" },
  ]); */

  /*   const addCity = () => {
    setCities([...cities, { name: "", fee: "" }]);
  };
 */
  /*  const removeCity = (index: number) => {
    setCities(cities.filter((_, i) => i !== index));
  };

  const handleCityChange = (
    index: number,
    field: keyof City,
    value: string
  ) => {
    const updatedCities = [...cities];
    updatedCities[index][field] = value;
    setCities(updatedCities);
  }; */

  const handleAddLogistic = async () => {
    setIsLoading(true);
    await addLogistic(name, email, number);
    setIsLoading(false);
  };
  return (
    <div
      className="text-black"
      //className="mx-auto p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Add New Logistics Provider
      </h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Company name"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />

      {/*    <select className="w-full border p-3.5 rounded-3xl mb-3">
        <option>Delivering from (State)</option>
        <option>Lagos</option>
        <option>Abuja</option>
        <option>Rivers</option>
      </select>

      <select className="w-full border p-3.5 rounded-3xl mb-3">
        <option>Delivering to (State)</option>
        <option>Kano</option>
        <option>Imo</option>
        <option>Ogun</option>
      </select> */}

      {/*    <h3 className="text-lg font-medium mb-2 text-center">
        Cities & Delivery Fees
      </h3>
      {cities.map((city, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            type="text"
            value={city.name}
            onChange={(e) => handleCityChange(index, "name", e.target.value)}
            placeholder="City"
            className="flex-1 border p-3.5 rounded-3xl"
          />
          <input
            type="text"
            value={city.fee}
            onChange={(e) => handleCityChange(index, "fee", e.target.value)}
            placeholder="Fee"
            className="w-24 border p-6 rounded"
          />
          <button className="text-red-500" onClick={() => removeCity(index)}>
            ✖
          </button>
        </div>
      ))} */}
      {/* 
      <button className="text-kikaeBlue mb-3" onClick={addCity}>
        + Add city
      </button> */}

      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        type="text"
        placeholder="Company Contact Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      {/*   <input
        type="text"
        placeholder="WhatsApp Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      /> */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Company Email"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />

      <button
        onClick={handleAddLogistic}
        className="w-full bg-kikaeBlue text-white p-3.5 rounded-3xl mb-2"
      >
        {isLoading ? <Loader /> : " Save logistics provider"}
      </button>
      <button onClick={closeModal} className="w-full border p-3.5 rounded-3xl">
        Cancel
      </button>
    </div>
  );
}
