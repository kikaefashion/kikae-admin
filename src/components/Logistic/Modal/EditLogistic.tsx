"use client";

import Loader from "@/components/Loader";
import { addLogisticDestination } from "@/networking/endpoints/logistics/addLogisticDestination";
import { getLogistic } from "@/networking/endpoints/logistics/getLogistic";
import { getStates } from "@/networking/endpoints/logistics/getStates";
import { removeLogisticDestination } from "@/networking/endpoints/logistics/removeLogisticDestination";
import { updateLogistic } from "@/networking/endpoints/logistics/updateLogistic";
import { updateLogisticDestination } from "@/networking/endpoints/logistics/updateLogisticDestination";
import type { LogisticsType } from "@/types/logisticsType";
import { stateType } from "@/types/stateType";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const EditLogisticsProvider = () => {
  return (
    <Suspense>
      <EditLogistics />
    </Suspense>
  );
};

function EditLogistics() {
  const logistic_id = useSearchParams().get("logistic");
  const [logistic, setLogistic] = useState<LogisticsType>();
  const [name, setName] = useState(logistic?.name);
  const [number, setNumber] = useState(logistic?.phone);
  const [email, setEmail] = useState(logistic?.email);
  const [states, setStates] = useState<stateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogisticLoading, setIsLogisticLoading] = useState(true);
  // const [destinations, setDestinations] = useState<Destination[]>([
  //   { name: "Ikeja", fee: "2500" },
  //   { name: "Ikorodu", fee: "3000" },
  //   { name: "Epe", fee: "3500" },
  // ])

  const addDestination = () => {
    if (!logistic) return;
    const updatedLogistic = {
      ...logistic,
      destinations: [
        ...logistic.destinations,
        {
          id: 0,
          logistic_id: "",
          state_id: "",
          area: "",
          cost: "",
          state: { name: "", id: 0 },
        },
      ],
    };
    if (!updatedLogistic) return;

    setLogistic(updatedLogistic);
  };

  const removeDestination = async (index: number, id: string | number) => {
    if (!logistic) return;
    const updatedLogistic = {
      ...logistic,
      destinations: logistic.destinations.filter((_, i) => i !== index),
    };
    await removeLogisticDestination(id);
    setLogistic(updatedLogistic);
  };

  const handleDestinationChange = (
    index: number,
    field: "area" | "cost",
    value: string
  ) => {
    if (!logistic) return;
    const updatedDestinations = [...logistic.destinations];
    updatedDestinations[index][field] = value;
    const updatedLogistic = {
      ...logistic,
      destinations: updatedDestinations,
    };
    setLogistic(updatedLogistic);
  };

  const handleUpdateLogistic = async () => {
    if (!logistic?.id || !name || !email || !number) return;
    setIsLoading(true);
    await updateLogistic(logistic?.id, name, email, number);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleGetLogistic = async () => {
      if (!logistic_id) return;
      const logisticResult = await getLogistic(logistic_id);
      const stateResult = await getStates();
      setStates(stateResult.data);
      setLogistic(logisticResult.data);
      setIsLogisticLoading(false);
    };

    handleGetLogistic();
  }, [logistic_id]);
  const handleUpdateLogistination = async (
    id: string | number,
    destination_id: string | number,
    area: string,
    cost: string,
    state_id: string | number
  ) => {
    if (!destination_id || !state_id) {
      addLogisticDestination(id, area, cost, state_id);
      return;
    }

    updateLogisticDestination(id, destination_id, area, cost, state_id);
  };

  if (isLogisticLoading) return <div>Loading..</div>;

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
        value={name}
        defaultValue={logistic?.name}
        onChange={(e) => setName(e.target.value)}
      />
      {/*       <select className="w-full border p-3.5 rounded-3xl mb-3">
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
      <h3 className="text-lg font-medium mb-2 text-center">
        Destinations & Delivery Fees
      </h3>
      {logistic?.destinations?.map((destination, index) => (
        <div key={index} className="flex space-x-2 mb-2 items-center">
          <select
            value={destination.state.id || ""}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selectedState = states.find((s) => s.id === selectedId);
              if (!selectedState) return;

              const updatedDestinations = [...logistic.destinations];
              updatedDestinations[index].state = {
                id: selectedState.id,
                name: selectedState.name,
              };

              setLogistic({ ...logistic, destinations: updatedDestinations });
            }}
            className="flex-1 border p-3.5 rounded-3xl w-[40%] cursor-pointer"
          >
            <option value="">Select state</option>
            {states.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/*  <input
            type="text"
            value={destination.state.name}
            onChange={(e) =>
              handleDestinationChange(index, "area", e.target.value)
            }
            placeholder="Destination"
            className="flex-1 border p-3.5 rounded-3xl"
          /> */}
          <input
            type="text"
            value={destination.area}
            onChange={(e) =>
              handleDestinationChange(index, "area", e.target.value)
            }
            placeholder="Destination"
            className="flex-1 border p-3.5 rounded-3xl w-[40%]"
          />
          <input
            type="text"
            value={destination.cost}
            onChange={(e) =>
              handleDestinationChange(index, "cost", e.target.value)
            }
            placeholder="Fee"
            className="w-[18%] border p-6 rounded"
          />
          <button
            className="text-red-500"
            onClick={() => removeDestination(index, destination.id)}
          >
            ✖
          </button>
          <button
            className="text-kikaeBlue mb-3"
            onClick={() =>
              handleUpdateLogistination(
                logistic.id,
                destination.id,
                destination.area,
                destination.cost,

                destination?.state?.id
              )
            }
          >
            <Check />
          </button>
        </div>
      ))}
      <button className="text-kikaeBlue mb-3" onClick={addDestination}>
        + Add destination
      </button>

      <input
        defaultValue={logistic?.phone}
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        type="text"
        placeholder="Company Contact Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      {/*     <input
        type="text"
        placeholder="WhatsApp Number"
        className="w-full border p-3.5 rounded-3xl mb-3"
      /> */}
      <input
        defaultValue={logistic?.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Company Email"
        className="w-full border p-3.5 rounded-3xl mb-3"
      />
      <button
        onClick={handleUpdateLogistic}
        className="w-full bg-kikaeBlue text-white p-3.5 rounded-3xl mb-2"
      >
        {isLoading ? <Loader /> : "  update logistics provider"}
      </button>
      <button className="w-full border p-3.5 rounded-3xl">Cancel</button>
    </div>
  );
}

export default EditLogisticsProvider;
