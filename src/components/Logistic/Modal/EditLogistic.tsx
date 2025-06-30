"use client";
import { useState } from "react";

interface City {
  name: string;
  fee: string;
}

export default function EditLogisticsProvider() {
  const [cities, setCities] = useState<City[]>([
    { name: "Ikeja", fee: "2500" },
    { name: "Ikorodu", fee: "3000" },
    { name: "Epe", fee: "3500" },
  ]);

  const addCity = () => {
    setCities([...cities, { name: "", fee: "" }]);
  };

  const removeCity = (index: number) => {
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
  };

  return (
    <div
      className="text-black"
      //className="mx-auto p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Edit Logistics Provider
      </h2>

      <input
        type="text"
        placeholder="Company name"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />

      <select className="w-full border p-3.5 rounded-3xl mb-3">
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
      </select>

      <h3 className="text-lg font-medium mb-2 text-center">
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
      ))}

      <button className="text-kikaeBlue mb-3" onClick={addCity}>
        + Add city
      </button>

      <input
        type="text"
        placeholder="Company Contact Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      <input
        type="text"
        placeholder="WhatsApp Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      <input
        type="email"
        placeholder="Company Email"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />

      <button className="w-full bg-kikaeBlue text-white p-3.5 rounded-3xl mb-2">
        update logistics provider
      </button>
      <button className="w-full border p-3.5 rounded-3xl">Cancel</button>
    </div>
  );
}
